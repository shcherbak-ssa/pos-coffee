import { proxy } from 'valtio';

import type { CategorySchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type { CartProduct, CartState, CartStore, CartStoreActions } from '@app/shared/types';

export const cartStore: CartStore & CartStoreActions = {

  state: proxy<CartState>({
    activeCategoryId: ZERO,
    categories: [],
    products: [],
  }),

  setActiveCategoryId(categoryId: number): void {
    cartStore.state.activeCategoryId = categoryId;
  },

  setCategories(categories: CategorySchema[]): void {
    cartStore.state.categories = [ ...categories ];
  },

  setProducts(products: CartProduct[]): void {
    cartStore.state.products = [ ...products ];
  },

};
