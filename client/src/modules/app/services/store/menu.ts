import { proxy } from 'valtio';

import type { CategorySchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type { MenuProduct, MenuState, MenuStore, MenuStoreActions } from '@app/shared/types';

export const menuStore: MenuStore & MenuStoreActions = {

  state: proxy<MenuState>({
    activeCategoryId: ZERO,
    categories: [],
    products: [],
  }),

  setActiveCategoryId(categoryId: number): void {
    menuStore.state.activeCategoryId = categoryId;
  },

  setCategories(categories: CategorySchema[]): void {
    menuStore.state.categories = [ ...categories ];
  },

  setProducts(products: MenuProduct[]): void {
    menuStore.state.products = [ ...products ];
  },

};
