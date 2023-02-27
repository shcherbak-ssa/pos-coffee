import { proxy } from 'valtio';

import type { CategorySchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type {
  CartOrderLineSchema as BaseCartOrderLineSchema,
  CartPayload,
  CartProductSchema,
  CartService as BaseCartService,
  CartState,
  CartStockAlertMessage,
  CartStore,
  CartStoreActions,
} from '@app/shared/types';
import { CartOrderSchema } from '@app/models/cart';
import { CartService } from '@app/services/cart';

export const cartStore: CartStore & CartStoreActions = {

  state: proxy<CartState>({
    order: CartOrderSchema.create(),
    activeCategoryId: ZERO,
  }),

  categories: [],
  products: [],

  getStockAlert: () => {
    return CartService.create(cartStore);
  },

  createOrder(): void {
    cartStore.state.order = CartOrderSchema.create();
  },

  addOrderLine(line: BaseCartOrderLineSchema): void {
    cartStore.state.order.lines.push(line);
  },

  removeOrderLine(lineToRemove: BaseCartOrderLineSchema): void {
    const { order } = cartStore.state;
    const isSameOrderLine = createCartService().isSameOrderLine;

    order.lines = order.lines.filter((line) => {
      return !isSameOrderLine(line, lineToRemove);
    });
  },

  removeAllOrderLines(): void {
    cartStore.state.order.lines = [];
  },

  updateOrderLineCount(lineToUpdate: BaseCartOrderLineSchema, count: number): void {
    const { order } = cartStore.state;
    const isSameOrderLine = createCartService().isSameOrderLine;

    order.lines = order.lines.map((line) => {
      return isSameOrderLine(line, lineToUpdate) ? { ...line, count } : line;
    });
  },

  setActiveCategoryId(categoryId: number): void {
    cartStore.state.activeCategoryId = categoryId;
  },

  setCategories(categories: CategorySchema[]): void {
    cartStore.categories = [ ...categories ];
  },

  setProducts(products: CartProductSchema[]): void {
    cartStore.products = [ ...products ];
  },

};

function createCartService(): BaseCartService {
  return CartService.create(cartStore);
}
