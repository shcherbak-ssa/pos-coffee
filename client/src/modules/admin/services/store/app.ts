import { proxy } from 'valtio';

import type { AppPageSchema, AppState, AppStore, AppStoreActions } from 'modules/admin/shared/types';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    isAppMenuOpen: false,
    currentPage: null,
  }),

  setCurrentPage(page: AppPageSchema): void {
    appStore.state.currentPage = page;
  },

  setIsAppMenuOpen(isOpen: boolean): void {
    appStore.state.isAppMenuOpen = isOpen;
  },

};
