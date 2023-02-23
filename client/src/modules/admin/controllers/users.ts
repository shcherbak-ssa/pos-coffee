import type { UserSchema as BaseUserSchema, Entity } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'lib/crud-controller';

import type { UsersController as BaseUsersController, UsersFilter, UsersStoreActions } from '@admin/shared/types';
import { ApiEndpoint, ControllerName, StoreName, ValidationName } from '@admin/shared/constants';
import { UserSchema, createFilter } from '@admin/models/user';
import type { AppController } from './app';
import { Context } from 'shared/context';

export class UsersController extends CrudController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController(StoreName.USERS, EntityName.USER);
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

    const savedUserId: number | undefined = await this.tryToSave({
      endpoint: ApiEndpoint.USERS,
      entity: copiedUser as BaseUserSchema as Entity,
      isEntityNew: copiedUser.isNewSchema(),
      validationName: ValidationName.USERS,
    });

    if (savedUserId) {
      this.updateCurrentUser(user);
      return savedUserId;
    }
  }

  public async archive(userId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.USERS_ARCHIVE,
      entityId: userId,
      action: 'archive',
    });
  }

  public async restore(userId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.USERS_RESTORE,
      entityId: userId,
      action: 'restore',
    });
  }

  public async select(userId: number = ZERO): Promise<void> {
    await this.tryToSelect(userId);
  }

  private async updateCurrentUser(user: BaseUserSchema): Promise<void> {
    const appController = Context.getController(ControllerName.APP) as AppController;
    const currentUser: BaseUserSchema = await appController.getCurrentUser();

    if (currentUser.id === user.id) {
      await appController.setCurrentUser(user);
    }
  }

}
