import type { ApiService, CategorySchema, NotificationService, OrderLineSchema, OrderSchema, OrderUserSchema } from 'shared/types';
import { EntityName, PaymentMethodType, ZERO } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type {
  AppStore,
  CartController as BaseCartController,
  CartOrderLineSchema as BaseCartOrderLineSchema,
  CartOrderSchema,
  CartPayload,
  CartProductSchema,
  CartService as BaseCartService,
  CartStore,
  CartStoreActions,
  UserSchema,
} from '@app/shared/types';
import { ApiEndpoint, PRODUCT_COUNT_STEP, StoreName } from '@app/shared/constants';
import { CartOrderLineSchema } from '@app/models/cart';
import { CartService } from '@app/services/cart';
import { AppError } from 'shared/errors';

export class CartController extends BaseController implements BaseCartController {

  private service!: BaseCartService;

  public static create(): CartController {
    const controller: CartController = new CartController(StoreName.CART, EntityName.ANY);
    controller.setService();

    return controller;
  }

  public async createOrder(): Promise<boolean> {
    try {
      const { state: { users } } = await this.getStore(StoreName.APP) as AppStore;

      if (!users.cashier) {
        throw new AppError('Create order', 'Cashier not defined');
      }

      const notificationService: NotificationService = await this.getNotificationService();

      notificationService.addNotification({
        type: 'process',
        severity: 'info',
        heading: 'Creating...',
        message: `A new order is being created`,
      });

      const cartStore = await this.getStore() as (CartStore & CartStoreActions);
      const { order } = cartStore.state;

      const apiService: ApiService = await this.getApiService();
      const createdOrder: OrderSchema = await apiService
        .addBody(this.parseOrder(order, users.cashier))
        .post(ApiEndpoint.CART_ORDERS);

      console.log(createdOrder);

      cartStore.resetOrder();

      notificationService.addNotification({
        severity: 'success',
        heading: 'Created',
        message: `Order created successfully`,
      });

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
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
      await this.parseError(e);
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
      await this.parseError(e);
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

  private parseOrder(order: CartOrderSchema, user: UserSchema): Partial<
    Omit<OrderSchema, 'user' | 'lines'> & {
      user: Partial<OrderUserSchema>,
      lines: Partial<OrderLineSchema>[],
    }
  > {
    return {
      user: { id: user.id },
      lines: order.lines.map(({ count, price, product, variant }) => ({
        count,
        price,
        productId: product.id,
        variantId: variant?.id,
      })),
      paymentMethod: order.paymentMethod,
    };
  }

}
