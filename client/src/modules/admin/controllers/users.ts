import type { UserSchema as BaseUserSchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { Context } from 'shared/context';
import { CrudController } from 'lib/crud-controller';

import type { UsersController as BaseUsersController, UsersFilter, UsersStoreActions } from '@admin/shared/types';
import { ApiEndpoint, ControllerName, StoreName, ValidationName } from '@admin/shared/constants';
import { updateSelectedEntityTitle } from '@admin/shared/helpers/selected-entity-title';
import { createFilter } from '@admin/models/user';
import type { AppController } from '@admin/controllers/app';

export class UsersController extends CrudController<BaseUserSchema> implements BaseUsersController {

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

  public async save(): Promise<boolean> {
    const success: boolean = await this.tryToSave({
      endpoint: ApiEndpoint.USERS,
      validationName: ValidationName.USERS,
    });

    if (success) {
      await this.updateCurrentUser();
      this.updateSelectedEntityTitle();
    }

    return success;
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

    this.updateSelectedEntityTitle();
  }

  private async updateCurrentUser(): Promise<void> {
    const store = await this.getStore() as UsersStoreActions;
    const selectedUser: BaseUserSchema = store.selected.get();

    const appController = Context.getController(ControllerName.APP) as AppController;
    const currentUser: BaseUserSchema = await appController.getCurrentUser();

    if (currentUser.id === selectedUser.id) {
      await appController.setCurrentUser(selectedUser);
    }
  }

  private updateSelectedEntityTitle(): void {
    updateSelectedEntityTitle<BaseUserSchema>(
      StoreName.USERS,
      (user: BaseUserSchema) => `${user.name} ${user.surname}`,
    );
  }

}
