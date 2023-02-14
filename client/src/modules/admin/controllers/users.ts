import { Context } from 'shared/context';
import { parseError } from 'shared/helpers/parse-error';
import { BaseController } from 'controllers/base-controller';

import type {
  UserSchema,
  UsersController as BaseUsersController,
  UsersStore,
  UsersStoreWithActions,
  UsersViewState,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName } from '@admin/shared/constants';

export class UsersController extends BaseController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
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

  public async loadUser(userId: number): Promise<boolean> {
    try {
      const user: UserSchema = await this.api
        .addParams({ id: userId })
        .get(ApiEndpoint.USERS_ID);

      const store = await this.getStore() as UsersStoreWithActions;
      store.addUser(user);

      return true;
    } catch (e: any) {
      parseError(e);
      return false;
    }
  }

  public async setCurrentUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as UsersStoreWithActions;
    store.setCurrentUser(user);
  }

  public async selectUser(userId: number): Promise<void> {
    try {
      const store = await this.getStore() as UsersStoreWithActions;
      store.selectUser(userId);
    } catch (e: any) {
      parseError(e);
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

}
