import type { Store, UserSchema } from 'shared/types';
import { Context } from 'shared/context';

import type {
  AppController as BaseAppController,
  AppPageSchema,
  AppStore,
  AppStoreActions,
  AppViewState,
} from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';

export class AppController implements BaseAppController {

  private constructor() {}

  public static create(): AppController {
    return new AppController();
  }

  public async getCurrentUser(): Promise<UserSchema> {
    const store = await this.getStore() as AppStore;
    return store.state.currentUser;
  }

  public async setCurrentPage(page: AppPageSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setCurrentPage(page);
  }

  public async setCurrentUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setCurrentUser(user);
  }

  public async setIsAppMenuOpen(isOpen: boolean): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setIsAppMenuOpen(isOpen);
  }

  public async updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.updateViewState(state, value);
  }

  private async getStore(): Promise<Store> {
    await Context.loadStore(StoreName.APP);

    return Context.getStore(StoreName.APP) as Store;
  }

}
