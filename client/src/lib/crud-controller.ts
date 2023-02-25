import type {
  ApiService,
  Entity,
  NotificationService,
  PayloadToSave,
  PayloadToGetById,
  PayloadToGetAll,
  Store,
  StoreCrud,
  ValidationService,
  PayloadToChangeArchiveState,
  StoreEntityState,
} from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { Context } from 'shared/context';
import { notifications } from 'shared/configs/notifications';
import { BaseController } from 'lib/base-controller';

export class CrudController<T extends Entity> extends BaseController {

  private storeName: string;

  protected constructor(storeName: string, entityName: EntityName) {
    super(entityName);
    this.storeName = storeName;
  }

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
    query,
  }: PayloadToSave<T, Q>): Promise<boolean> {
    try {
      const store = await this.getStore() as StoreCrud<T>;

      if (!store.selected.hadUpdates()) {
        return true;
      }

      const entity: T = store.selected.get();
      const isEntityNew: boolean = this.isNewEntity(entity);

      const notificationService: NotificationService = await this.getNotificationService();

      notificationService.addNotification(
        isEntityNew
          ? notifications.createProcess(this.entityName)
          : notifications.updateProcess(this.entityName)
      );

      const updates: Partial<T> = store.selected.getUpdates();
      let savedEntity: T = entity;

      const validationService: ValidationService = await this.getValidationService();
      await validationService.validate(isEntityNew ? 'toCreate' : 'toUpdate', validationName, updates);

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

  public async tryToSelect(entityId: number): Promise<void> {
    try {
      const store = await this.getStore() as StoreCrud & StoreEntityState<{}, T>;
      store.selected.set(entityId);
    } catch (e: any) {
      await this.parseError(e);
    }
  }

  protected async getStore(): Promise<Store> {
    await Context.loadStore(this.storeName);

    return Context.getStore(this.storeName);
  }

  private isNewEntity(entity: T): boolean {
    return entity.id === ZERO;
  }

}
