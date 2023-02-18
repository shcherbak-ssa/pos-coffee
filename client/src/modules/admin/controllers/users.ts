import type { UserSchema as BaseUserSchema, ApiService, NotificationService, ValidationService, Store, Entity } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'controllers/crud-controller';

import type {
  UsersController as BaseUsersController,
  UsersFilter,
  UsersStore,
  UsersStoreActions,
  UserUpdates,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { UserSchema, createUsersFilter } from '@admin/models/user';

export class UsersController extends CrudController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController(StoreName.USERS);
  }

  public async setCurrentUser(user: BaseUserSchema): Promise<void> {
    const store = await this.getStore() as UsersStoreActions;
    store.setCurrentUser(user);
  }

  public async selectUser(userId: number = ZERO): Promise<void> {
    try {
      const store = await this.getStore() as UsersStoreActions;
      store.selected.set(userId);
    } catch (e: any) {
      await this.parseError(e);
    }
  }

  /**
   * Crud implementation
   */

  public async loadById(userId: number): Promise<boolean> {
    return await this.tryToLoadById({
      endpoint: ApiEndpoint.USERS_ID,
      entityId: userId,
    });
  }

  public async loadAll(filter?: UsersFilter): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.USERS,
      filter: createUsersFilter(filter || {}),
    });
  }

  public async save(user: BaseUserSchema): Promise<number | undefined> {
    const copiedUser: UserSchema = UserSchema.create(user);

    return await this.tryToSave({
      endpoint: ApiEndpoint.USERS,
      entity: copiedUser as BaseUserSchema as Entity,
      isEntityNew: copiedUser.isNewSchema(),
      validationName: ValidationName.USERS,
      entityName: EntityName.USER,
    });
  }

  public async delete(userId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.USERS_ARCHIVE,
      entityId: userId,
      entityName: EntityName.USER,
      action: 'archive',
    });
  }

  public async restore(userId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.USERS_RESTORE,
      entityId: userId,
      entityName: EntityName.USER,
      action: 'restore',
    });
  }

  /**
   * Private
   */

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
