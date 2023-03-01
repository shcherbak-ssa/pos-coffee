import type { ApiService, NotificationService } from 'shared/types';
import { EntityName, PaymentMethodType, ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { BaseController } from 'lib/base-controller';

import type {
  AppMenu,
  AppStore,
  AppStoreActions,
  CartController as BaseCartController,
  CartOrderLineSchema as BaseCartOrderLineSchema,
  CartPayload,
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

  public async createOrder(): Promise<boolean> {
    try {
      const appStore = await this.getStore(StoreName.APP) as (AppStore & AppStoreActions);

      if (!appStore.state.users.cashier) {
        throw new AppError('Create order', 'Cashier not defined');
      }

      const { cashier } = appStore.state.users;

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
      await apiService
        .addBody(this.service.parseOrder(order, cashier, appStore.state.settings.taxes))
        .post(ApiEndpoint.APP_ORDERS);

      await this.loadMenu();
      cartStore.resetOrder();

      appStore.setCashier(null);
      setTimeout(() => appStore.setCashier(cashier));

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

  public async loadMenu(): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const { categories, products }: AppMenu = await apiService.get(ApiEndpoint.APP_MENU);

      const store = await this.getStore() as CartStoreActions;
      store.setCategories(categories);
      store.setProducts(products);
    } catch (e: any) {
      this.parseError(e);
    }
  }

  private async setService(): Promise<void> {
    const store = await this.getStore() as (CartStore & CartStoreActions);
    this.service = CartService.create(store);
  }

}
