import { Context } from 'shared/context';
import { parseError } from 'shared/helpers/parse-error';
import { BaseController } from 'controllers/base-controller';

import type {
  UserSchema,
  UsersController as BaseUsersController,
  UsersStore,
  UsersStoreWithActions,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName } from '@admin/shared/constants';

export class UsersController extends BaseController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
  }

  public async setCurrentUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as UsersStoreWithActions;

    store.setCurrentUser(user);
  }

  public async loadUsers(): Promise<boolean> {
    try {
      const users: UserSchema[] = await this.api.get(ApiEndpoint.USERS);
      const store = await this.getStore() as UsersStoreWithActions;

      store.setUsers(users);

      return true;
    } catch (e: any) {
      parseError(e);
      return false;
    }
  }

  private async getStore(): Promise<UsersStore> {
    await Context.loadStore(StoreName.USERS);

    return Context.getStore(StoreName.USERS) as UsersStore;
  }

}
