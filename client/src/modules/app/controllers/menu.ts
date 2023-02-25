import type { ApiService, CategorySchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type { MenuController as BaseMenuController, MenuProduct, MenuStoreActions } from '@app/shared/types';
import { ApiEndpoint, StoreName } from '@app/shared/constants';

export class MenuController extends BaseController implements BaseMenuController {

  public static create(): MenuController {
    return new MenuController(StoreName.MENU, EntityName.ANY);
  }

  public async setActiveCategoryId(categoryId: number = ZERO): Promise<void> {
    const store = await this.getStore() as MenuStoreActions;
    store.setActiveCategoryId(categoryId);
  }

  public async loadCategories(): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();
      const categories: CategorySchema[] = await apiService.get(ApiEndpoint.MENU_CATEGORIES);

      const store = await this.getStore() as MenuStoreActions;
      store.setCategories(categories);

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
  }

  public async loadProducts(): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();
      const products: MenuProduct[] = await apiService.get(ApiEndpoint.MENU_PRODUCTS);

      const store = await this.getStore() as MenuStoreActions;
      store.setProducts(products);

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
  }

}
