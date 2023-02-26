import { proxy } from 'valtio';

import type { CategorySchema, OrderLineSchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type {
  CartProductSchema,
  CartState,
  CartStore,
  CartStoreActions,
} from '@app/shared/types';
import { isSameOrderLine } from '@app/shared/helpers/order-line';
import { CartOrderSchema } from '@app/models/order';

export const cartStore: CartStore & CartStoreActions = {

  state: proxy<CartState>({
    currentOrder: CartOrderSchema.create(),
    activeCategoryId: ZERO,
    categories: [],
    products: [],
  }),

  createOrder(): void {
    cartStore.state.currentOrder = CartOrderSchema.create();
  },

  addOrderLine(line: OrderLineSchema): void {
    cartStore.state.currentOrder.lines.push(line);
  },

  removeOrderLine(lineToRemove: OrderLineSchema): void {
    const { currentOrder } = cartStore.state;

    currentOrder.lines = currentOrder.lines.filter((line) => {
      return !isSameOrderLine(line, lineToRemove);
    });
  },

  removeAllOrderLines(): void {
    cartStore.state.currentOrder.lines = [];
  },

  updateOrderLineCount(lineToUpdate: OrderLineSchema, count: number): void {
    const { currentOrder } = cartStore.state;

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
