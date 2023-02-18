import type { UserSchema as BaseUserSchema, Entity } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'controllers/crud-controller';

import type { UsersController as BaseUsersController, UsersFilter, UsersStoreActions } from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { UserSchema, createFilter } from '@admin/models/user';

export class UsersController extends CrudController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController(StoreName.USERS);
  }

  public async setCurrentUser(user: BaseUserSchema): Promise<void> {
    const store = await this.getStore() as UsersStoreActions;
    store.setCurrentUser(user);
  }

  public async loadById(userId: number): Promise<boolean> {
    return await this.tryToLoadById({
      endpoint: ApiEndpoint.USERS_ID,
      entityId: userId,
    });
  }

  public async loadAll(filter?: UsersFilter): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.USERS,
      filter: createFilter(filter || {}),
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

  public async archive(userId: number): Promise<boolean> {
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

  public async select(userId: number = ZERO): Promise<void> {
    await this.tryToSelect(userId);
  }

}
