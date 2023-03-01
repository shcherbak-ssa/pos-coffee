import type {
  ApiService,
  Entity,
  NotificationService,
  PayloadToSave,
  PayloadToGetById,
  PayloadToGetAll,
  StoreCrud,
  ValidationService,
  PayloadToChangeArchiveState,
  StoreEntityState,
  PayloadToDelete,
} from 'shared/types';
import { ZERO } from 'shared/constants';
import { notifications } from 'shared/configs/notifications';
import { BaseController } from 'lib/base-controller';

export class CrudController<T extends Entity> extends BaseController {

  protected async tryToLoadById({ endpoint, entityId }: PayloadToGetById): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();

      const entity: T = await apiService
        .addParams({ id: entityId })
        .get(endpoint);

      const store = await this.getStore() as StoreCrud<T>;
      store.save(entity);

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  protected async tryToLoadAll<F>({ endpoint, filter }: PayloadToGetAll<F>): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();

      const entities: T[] = await apiService
        .addQuery(filter)
        .get(endpoint);

      const store = await this.getStore() as StoreCrud<T>;
      store.add(entities);

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  protected async tryToSave<Q>({
    endpoint,
    validationName,
    entity,
    query,
  }: PayloadToSave<T, Q>): Promise<boolean> {
    try {
      const store = await this.getStore() as StoreCrud<T>;

      if (!store.selected.hadUpdates()) {
        return true;
      }

      const entityToSave: T = entity || store.selected.get();
      const isEntityNew: boolean = this.isNewEntity(entityToSave);

      const notificationService: NotificationService = await this.getNotificationService();

      notificationService.addNotification(
        isEntityNew
          ? notifications.createProcess(this.entityName)
          : notifications.updateProcess(this.entityName)
      );

      const validationService: ValidationService = await this.getValidationService();
      await validationService.validate(isEntityNew ? 'toCreate' : 'toUpdate', validationName, entityToSave);

      const updates: Partial<T> = store.selected.getUpdates();
      let savedEntity: T = entityToSave;

      const apiService: ApiService = await this.getApiService();
      apiService.addBody(updates);

      if (query) {
        apiService.addQuery(query);
      }

      if (isEntityNew) {
        savedEntity = await apiService.post(endpoint);
      } else {
        await apiService.put(endpoint);
      }

      store.save(savedEntity);
      store.selected.set(savedEntity.id);

      notificationService.addNotification(
        isEntityNew
          ? notifications.created(this.entityName)
          : notifications.updated(this.entityName)
      );

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  protected async tryToChangeArchiveState({
    endpoint,
    action,
    entityId,
  }: PayloadToChangeArchiveState): Promise<boolean> {
    try {
      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(
        action === 'archive'
          ? notifications.archiveProcess(this.entityName)
          : notifications.restoreProcess(this.entityName)
      );

      const apiService: ApiService = await this.getApiService();
      await apiService
        .addParams({ id: entityId })
        .put(endpoint);

      const store = await this.getStore() as StoreCrud<T>;
      store.remove(entityId);

      notificationService.addNotification(
        action === 'archive'
          ? notifications.archived(this.entityName)
          : notifications.restored(this.entityName)
      );

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  protected async tryToDelete({ endpoint, entityId }: PayloadToDelete): Promise<boolean> {
    try {
      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(notifications.deleteProcess(this.entityName));

      const apiService: ApiService = await this.getApiService();
      await apiService
        .addParams({ id: entityId })
        .delete(endpoint);

      const store = await this.getStore() as StoreCrud<T>;
      store.remove(entityId);

      notificationService.addNotification(notifications.deleted(this.entityName));

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
  }

  public async tryToSelect(entityId: number): Promise<void> {
    try {
      const store = await this.getStore() as StoreCrud & StoreEntityState<{}, T>;
      store.selected.set(entityId);
    } catch (e: any) {
      await this.parseError(e);
    }
  }

  private isNewEntity(entity: T): boolean {
    return entity.id === ZERO;
  }

}
