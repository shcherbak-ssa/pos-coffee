import { proxy } from 'valtio';

import type { AppState, AppStore, AppStoreActions } from 'modules/admin/shared/types';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    isAppMenuOpen: false,
  }),

  setIsAppMenuOpen(isOpen: boolean): void {
    appStore.state.isAppMenuOpen = isOpen;
  },

};
