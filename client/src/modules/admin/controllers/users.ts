import type { ApiService, NotificationService, ValidationService } from 'shared/types';
import { ZERO } from 'shared/constants';
import { Context } from 'shared/context';
import { BaseController } from 'controllers/base-controller';

import type {
  UserSchema as BaseUserSchema,
  UsersController as BaseUsersController,
  UsersFilter as BaseUsersFilter,
  UsersStore,
  UsersStoreWithActions,
  UsersViewState,
  UserUpdates,
} from '@admin/shared/types';
import { ApiEndpoint, Entity, StoreName, ValidationName } from '@admin/shared/constants';
import { notifications } from '@admin/shared/configs';
import { UserSchema, createUsersFilter } from '@admin/models/user';

export class UsersController extends BaseController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
  }

  public async loadUsers(filter?: BaseUsersFilter): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();
      const users: BaseUserSchema[] = await apiService
        .addQuery(createUsersFilter(filter || {}))
        .get(ApiEndpoint.USERS);

      const store = await this.getStore() as UsersStoreWithActions;
      store.setUsers(users);

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  public async loadUser(userId: number): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();
      const user: BaseUserSchema = await apiService
        .addParams({ id: userId })
        .get(ApiEndpoint.USERS_ID);

      const store = await this.getStore() as UsersStoreWithActions;
      store.addUser(user);

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  public async saveUser(user: UserSchema): Promise<boolean> {
    try {
      const store = await this.getStore() as UsersStoreWithActions;

      if (!store.hasSelectedUserUpdates()) {
        return true;
      }

      const isNewSchema: boolean = user.isNewSchema();

      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(
        isNewSchema
          ? notifications.createProcess(Entity.USER)
          : notifications.updateProcess(Entity.USER)
      );

      const updates: UserUpdates = store.getSelectedUserUpdates();
      let savedUser: BaseUserSchema = UserSchema.create(user);

      if (isNewSchema) {
        savedUser = await this.createUser(updates);
      } else {
        await this.updateUser(updates);
      }

      store.addUser(savedUser);
      store.selectUser(savedUser.id);

      notificationService.addNotification(
        isNewSchema
          ? notifications.created(Entity.USER)
          : notifications.updated(Entity.USER)
      );

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  public async deleteUser(userId: number): Promise<boolean> {
    try {
      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(notifications.deleteProcess(Entity.USER));

      const apiService: ApiService = await this.getApiService();
      await apiService
        .addParams({ id: userId })
        .put(ApiEndpoint.USERS_DELETE);

      const store = await this.getStore() as UsersStoreWithActions;
      store.removeUser(userId);

      notificationService.addNotification(notifications.deleted(Entity.USER));

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  public async restoreUser(userId: number): Promise<boolean> {
    try {
      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(notifications.restoreProcess(Entity.USER));

      const apiService: ApiService = await this.getApiService();
      await apiService
        .addParams({ id: userId })
        .put(ApiEndpoint.USERS_RESTORE);

      const store = await this.getStore() as UsersStoreWithActions;
      store.removeUser(userId);

      notificationService.addNotification(notifications.restored(Entity.USER));

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  public async setCurrentUser(user: BaseUserSchema): Promise<void> {
    const store = await this.getStore() as UsersStoreWithActions;
    store.setCurrentUser(user);
  }

  public async selectUser(userId: number = ZERO): Promise<void> {
    try {
      const store = await this.getStore() as UsersStoreWithActions;
      store.selectUser(userId);
    } catch (e: any) {
      await this.parseError(e);
    }
  }

  public async updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): Promise<void> {
    const store = await this.getStore() as UsersStoreWithActions;
    store.updateViewState(state, value);
  }

  private async getStore(): Promise<UsersStore> {
    await Context.loadStore(StoreName.USERS);

    return Context.getStore(StoreName.USERS) as UsersStore;
  }

  private async createUser(updates: UserUpdates): Promise<BaseUserSchema> {
    const validationService: ValidationService = await this.getValidationService();
    await validationService.validateToCreate(ValidationName.USERS, updates);

    const apiService: ApiService = await this.getApiService();
    return await apiService
      .addBody(updates)
      .post(ApiEndpoint.USERS);
  }

  private async updateUser(updates: UserUpdates): Promise<void> {
    const validationService: ValidationService = await this.getValidationService();
    await validationService.validateToUpdate(ValidationName.USERS, updates);

    const apiService: ApiService = await this.getApiService();
    await apiService
      .addBody(updates)
      .put(ApiEndpoint.USERS);
  }

}
