import { ZERO } from 'shared/constants';
import { Context } from 'shared/context';
import { parseError } from 'shared/helpers/parse-error';
import { BaseController } from 'controllers/base-controller';

import type {
  UserSchema as BaseUserSchema,
  UsersController as BaseUsersController,
  UsersStore,
  UsersStoreWithActions,
  UsersViewState,
  UserUpdates,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { UserSchema } from '@admin/models/user';

export class UsersController extends BaseController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
  }

  public async loadUsers(): Promise<boolean> {
    try {
      const users: BaseUserSchema[] = await this.api.get(ApiEndpoint.USERS);

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
      const user: BaseUserSchema = await this.api
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

  public async saveUser(user: UserSchema): Promise<boolean> {
    try {
      const store = await this.getStore() as UsersStoreWithActions;

      if (!store.hasSelectedUserUpdates()) {
        return true;
      }

      const updates: UserUpdates = store.getSelectedUserUpdates();
      let savedUser: BaseUserSchema = UserSchema.create(user);

      if (user.isNewSchema()) {
        savedUser = await this.createUser(updates);
      } else {
        await this.updateUser(updates);
      }

      store.addUser(savedUser);
      store.selectUser(savedUser.id);

      return true;
    } catch (e: any) {
      parseError(e);
      return false;
    }
  }

  public async deleteUser(userId: number): Promise<boolean> {
    try {
      await this.api
        .addParams({ id: userId })
        .delete(ApiEndpoint.USERS_ID);

      const store = await this.getStore() as UsersStoreWithActions;
      store.removeUser(userId);

      return true;
    } catch (e: any) {
      parseError(e);
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

  private async createUser(updates: UserUpdates): Promise<BaseUserSchema> {
    await this.validation.validateToCreate(ValidationName.USERS, updates);

    return await this.api
      .addBody(updates)
      .post(ApiEndpoint.USERS);
  }

  private async updateUser(updates: UserUpdates): Promise<void> {
    await this.validation.validateToUpdate(ValidationName.USERS, updates);

    await this.api
      .addBody(updates)
      .put(ApiEndpoint.USERS);
  }

}
