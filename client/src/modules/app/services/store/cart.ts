import { proxy } from 'valtio';

import type { CategorySchema, OrderLineSchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type {
  CartProductSchema,
  CartService as BaseCartService,
  CartState,
  CartStockAlertMessage,
  CartStore,
  CartStoreActions,
} from '@app/shared/types';
import { CartOrderSchema } from '@app/models/order';
import { CartService } from '@app/services/cart';

export const cartStore: CartStore & CartStoreActions = {

  state: proxy<CartState>({
    order: CartOrderSchema.create(),
    orderLineStockAlerts: new Map([]),
    activeCategoryId: ZERO,
    categories: [],
    products: [],
  }),

  getStockAlert: () => {
    return CartService.create(cartStore);
  },

  createOrder(): void {
    cartStore.state.order = CartOrderSchema.create();
  },

  addStockAlert(line: OrderLineSchema, message: CartStockAlertMessage): void {
    cartStore.state.orderLineStockAlerts.set([ line.productId, line.variantId ], message);
  },

  removeStockAlert(line: OrderLineSchema): void {
    const { orderLineStockAlerts } = cartStore.state;

    for (const stockAlertLine of orderLineStockAlerts.keys()) {
      const [ productId, variantId ] = stockAlertLine;

      if (productId === line.productId && variantId === line.variantId) {
        orderLineStockAlerts.delete(stockAlertLine);
      }
    }
  },

  addOrderLine(line: OrderLineSchema): void {
    cartStore.state.order.lines.push(line);
  },

  removeOrderLine(lineToRemove: OrderLineSchema): void {
    const { order: currentOrder } = cartStore.state;
    const isSameOrderLine = createCartService().isSameOrderLine;

    currentOrder.lines = currentOrder.lines.filter((line) => {
      return !isSameOrderLine(line, lineToRemove);
    });
  },

  removeAllOrderLines(): void {
    cartStore.state.order.lines = [];
  },

  updateOrderLineCount(lineToUpdate: OrderLineSchema, count: number): void {
    const { order: currentOrder } = cartStore.state;
    const isSameOrderLine = createCartService().isSameOrderLine;

    currentOrder.lines = currentOrder.lines.map((line) => {
      return isSameOrderLine(line, lineToUpdate) ? { ...line, count } : line;
    });
  },

  setActiveCategoryId(categoryId: number): void {
    cartStore.state.activeCategoryId = categoryId;
  },

  setCategories(categories: CategorySchema[]): void {
    cartStore.state.categories = [ ...categories ];
  },

  setProducts(products: CartProductSchema[]): void {
    cartStore.state.products = [ ...products ];
  },

};

function createCartService(): BaseCartService {
  return CartService.create(cartStore);
}
