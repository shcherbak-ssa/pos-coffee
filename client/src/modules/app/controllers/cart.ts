import type { ApiService, CategorySchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type { CartController as BaseCartController, CartProduct, CartStoreActions } from '@app/shared/types';
import { ApiEndpoint, StoreName } from '@app/shared/constants';

export class CartController extends BaseController implements BaseCartController {

  public static create(): CartController {
    return new CartController(StoreName.CART, EntityName.ANY);
  }

  public async setActiveCategoryId(categoryId: number = ZERO): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.setActiveCategoryId(categoryId);
  }

  public async loadCategories(): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();
      const categories: CategorySchema[] = await apiService.get(ApiEndpoint.CART_CATEGORIES);

      const store = await this.getStore() as CartStoreActions;
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
      const products: CartProduct[] = await apiService.get(ApiEndpoint.CART_PRODUCTS);

      const store = await this.getStore() as CartStoreActions;
      store.setProducts(products);

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
  }

}
