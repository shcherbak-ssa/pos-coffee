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
} from 'shared/types';
import { Context } from 'shared/context';
import { notifications } from 'shared/configs';
import { BaseController } from 'controllers/base-controller';

export class CrudController extends BaseController {

  private storeName: string;

  protected constructor(storeName: string) {
    super();
    this.storeName = storeName;
  }

  protected async tryToLoadById<T>({ endpoint, entityId }: PayloadToGetById): Promise<boolean> {
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

  protected async tryToLoadAll<T, F>({ endpoint, filter }: PayloadToGetAll<F>): Promise<boolean> {
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

  protected async tryToSave<T extends Entity>({
    endpoint,
    entity,
    isEntityNew,
    validationName,
    entityName,
  }: PayloadToSave<T>): Promise<number | undefined> {
    try {
      const store = await this.getStore() as StoreCrud<T>;

      if (!store.selected.hadUpdates()) {
        return entity.id;
      }

      const notificationService: NotificationService = await this.getNotificationService();

      notificationService.addNotification(
        isEntityNew
          ? notifications.createProcess(entityName)
          : notifications.updateProcess(entityName)
      );

      const updates: Partial<T> = store.selected.getUpdates();
      let savedEntity: T = entity;

      const validationService: ValidationService = await this.getValidationService();
      await validationService.validate(isEntityNew ? 'toCreate' : 'toUpdate', validationName, updates);

      const apiService: ApiService = await this.getApiService();
      apiService.addBody(updates);

      if (isEntityNew) {
        savedEntity = await apiService.post(endpoint);
      } else {
        await apiService.put(endpoint);
      }

      store.save(savedEntity);
      store.selected.set(savedEntity.id);

      notificationService.addNotification(
        isEntityNew
          ? notifications.created(entityName)
          : notifications.updated(entityName)
      );

      return savedEntity.id;
    } catch (e: any) {
      await this.parseError(e);
    }
  }

  protected async tryToChangeArchiveState<T>({
    endpoint,
    action,
    entityId,
    entityName,
  }: PayloadToChangeArchiveState): Promise<boolean> {
    try {
      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(
        action === 'archive'
          ? notifications.archiveProcess(entityName)
          : notifications.restoreProcess(entityName)
      );

      const apiService: ApiService = await this.getApiService();
      await apiService
        .addParams({ id: entityId })
        .put(endpoint);

      const store = await this.getStore() as StoreCrud<T>;
      store.remove(entityId);

      notificationService.addNotification(
        action === 'archive'
          ? notifications.archived(entityName)
          : notifications.restored(entityName)
      );

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  protected async getStore(): Promise<Store> {
    await Context.loadStore(this.storeName);

    return Context.getStore(this.storeName);
  }

}
