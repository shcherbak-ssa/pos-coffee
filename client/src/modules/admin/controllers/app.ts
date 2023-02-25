import type { ApiService, ProductCategory, Store, UserSchema } from 'shared/types';
import { EMPTY_STRING, EntityName } from 'shared/constants';
import { Context } from 'shared/context';
import { BaseController } from 'lib/base-controller';

import type {
  AppController as BaseAppController,
  AppPageSchema,
  AppStore,
  AppStoreActions,
  AppViewState,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName } from '@admin/shared/constants';

export class AppController extends BaseController implements BaseAppController {

  public static create(): AppController {
    return new AppController(EntityName.ANY);
  }

  public async loadProductCategories(): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const productCategories: ProductCategory[] = await apiService.get(ApiEndpoint.APP_PRODUCT_CATEGORIES);

      const appStore = await this.getStore() as AppStoreActions;
      appStore.setProductCategories(productCategories);
    } catch (e: any) {
      this.parseError(e);
    }
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

  public async setSelectedEntityTitle(title: string): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setSelectedEntityTitle(title);
  }

  public async setIsAppMenuOpen(isOpen: boolean): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setIsAppMenuOpen(isOpen);
  }

  public async setIsEditMode(isEditMode: boolean): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setIsEditMode(isEditMode);
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
