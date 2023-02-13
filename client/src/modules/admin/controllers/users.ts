import type { CurrentUserSchema } from 'shared/types';
import { Context } from 'shared/context';

import type {
  UsersController as BaseUsersController,
  UsersStore,
  UsersStoreWithActions,
} from 'modules/admin/shared/types';
import { StoreName } from 'modules/admin/shared/constants';

export class UsersController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
  }

  public async setCurrentUser(user: CurrentUserSchema): Promise<void> {
    const store = await this.getStore() as UsersStoreWithActions;

    store.setCurrentUser(user);
  }

  private async getStore(): Promise<UsersStore> {
    await Context.loadStore(StoreName.USERS);

    return Context.getStore(StoreName.USERS) as UsersStore;
  }

}
