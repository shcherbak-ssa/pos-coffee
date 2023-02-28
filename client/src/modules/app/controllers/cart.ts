import type {
  ApiService,
  CategorySchema,
  NotificationService,
} from 'shared/types';
import { EntityName, PaymentMethodType, ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { BaseController } from 'lib/base-controller';

import type {
  CartController as BaseCartController,
  CartOrderLineSchema as BaseCartOrderLineSchema,
  CartPayload,
  CartProductSchema,
  CartService as BaseCartService,
  CartStore,
  CartStoreActions,
} from '@app/shared/types';
import { ApiEndpoint, PRODUCT_COUNT_STEP, StoreName } from '@app/shared/constants';
import { CartOrderLineSchema } from '@app/models/cart';
import { CartService } from '@app/services/cart';

export class CartController extends BaseController implements BaseCartController {

  private service!: BaseCartService;

  public static create(): CartController {
    const controller: CartController = new CartController(StoreName.CART, EntityName.ANY);
    controller.setService();

    return controller;
  }

  public async createOrder(): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.createOrder();
  }

  public async addOrderLine({ product, variant }: CartPayload): Promise<void> {
    try {
      const store = await this.getStore() as (CartStore & CartStoreActions);
      const lineToAdd: BaseCartOrderLineSchema = CartOrderLineSchema.create(product, variant);
      const foundLine: BaseCartOrderLineSchema | undefined = this.service.findLine(lineToAdd);

      if (foundLine) {
        this.updateOrderLineCount(lineToAdd, foundLine.count + PRODUCT_COUNT_STEP);
      } else {
        this.service.checkStock(lineToAdd, PRODUCT_COUNT_STEP);
        store.addOrderLine(lineToAdd);
      }
    } catch (e: any) {
      await this.parseStockError(e);
    }
  }

  public async removeOrderLine(line: BaseCartOrderLineSchema): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.removeOrderLine(line);
  }

  public async removeAllOrderLines(): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.removeAllOrderLines();
  }

  public async updateOrderLineCount(line: BaseCartOrderLineSchema, count: number): Promise<void> {
    try {
      const store = await this.getStore() as CartStoreActions;

      if (count === ZERO) {
        store.removeOrderLine(line);
        return;
      }

      this.service.checkStock(line, count);
      store.updateOrderLineCount(line, count);
    } catch (e: any) {
      await this.parseStockError(e);
    }
  }

  public async setOrderPaymentMethod(type: PaymentMethodType): Promise<void> {
    const store = await this.getStore() as CartStoreActions;
    store.setOrderPaymentMethod(type);
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

  private async setService(): Promise<void> {
    const store = await this.getStore() as (CartStore & CartStoreActions);
    this.service = CartService.create(store);
  }

  private async parseStockError(e: Error): Promise<void> {
    if (e instanceof AppError) {
      const notificationService: NotificationService = await this.getNotificationService();

      notificationService.addNotification({
        type: 'result',
        severity: 'error',
        heading: 'Add product',
        message: e.message,
      });

      return;
    }

    console.error(e);
  }

}
