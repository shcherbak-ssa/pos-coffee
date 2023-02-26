import type {
  ApiService,
  CategorySchema,
  OrderLineSchema as BaseOrderLineSchema,
  ProductVariantSchema,
} from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type {
  CartController as BaseCartController,
  CartProductSchema,
  CartStore,
  CartStoreActions,
} from '@app/shared/types';
import { ApiEndpoint, PRODUCT_COUNT_STEP, StoreName } from '@app/shared/constants';
import { isSameOrderLine } from '@app/shared/helpers/order-line';
import { OrderLineSchema } from '@app/models/order';

export class CartController extends BaseController implements BaseCartController {

  public static create(): CartController {
    return new CartController(StoreName.CART, EntityName.ANY);
  }

  public async createOrder(): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.createOrder();
  }

  public async addOrderLine(product: CartProductSchema, variant?: ProductVariantSchema): Promise<void> {
    const store = await this.getStore() as (CartStore & CartStoreActions);
    const lineToAdd: BaseOrderLineSchema = OrderLineSchema.create(product, variant);
    const foundLine: BaseOrderLineSchema | undefined = this.findLine(store.state.currentOrder.lines, lineToAdd);

    if (foundLine) {
      this.updateOrderLineCount(foundLine, foundLine.count + PRODUCT_COUNT_STEP);
    } else {
      store.addOrderLine(lineToAdd);
    }
  }

  public async removeOrderLine(line: BaseOrderLineSchema): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.removeOrderLine(line);
  }

  public async removeAllOrderLines(): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.removeAllOrderLines();
  }

  public async updateOrderLineCount(line: BaseOrderLineSchema, count: number): Promise<void> {
    const store = await this.getStore() as CartStoreActions;

    if (count === ZERO) {
      store.removeOrderLine(line);
      return;
    }

    store.updateOrderLineCount(line, count);
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
      const products: CartProductSchema[] = await apiService.get(ApiEndpoint.CART_PRODUCTS);

      const store = await this.getStore() as CartStoreActions;
      store.setProducts(products);

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
  }

  private findLine(orderLines: BaseOrderLineSchema[], lineToAdd: BaseOrderLineSchema): BaseOrderLineSchema | undefined {
    return orderLines.find((line) => isSameOrderLine(line, lineToAdd));
  }

}
