import { proxy } from 'valtio';

import type { ProductCategory } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';

import type { AppPageSchema, AppState, AppStore, AppStoreActions, AppViewState } from '@admin/shared/types';
import { ListView, ListTab } from '@admin/shared/constants';
import { UserSchema } from '@admin/models/user';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    productCategories: [],
    currentPage: { title: EMPTY_STRING },
    currentUser: UserSchema.create(),
    isAppMenuOpen: false,

    view: {
      listView: ListView.TABLE,
      listTab: ListTab.ACTIVE,
      listAction: [],
    },
  }),

  setProductCategories(productCategories: ProductCategory[]): void {
    appStore.state.productCategories = [...productCategories];
  },

  setCurrentPage(page: AppPageSchema): void {
    appStore.state.currentPage = page;
  },

  setCurrentUser(user: UserSchema): void {
    appStore.state.currentUser = UserSchema.create(user);
  },

  setIsAppMenuOpen(isOpen: boolean): void {
    appStore.state.isAppMenuOpen = isOpen;
  },

  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void {
    appStore.state.view[state] = value;
  },

};
