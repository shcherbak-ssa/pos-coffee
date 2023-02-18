import { proxy } from 'valtio';

import type { AppState, AppStore, AppStoreActions, AppViewState } from '@admin/shared/types';
import { ListView, ListTab } from '@admin/shared/constants';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    isAppMenuOpen: false,

    view: {
      listView: ListView.TABLE,
      listTab: ListTab.ACTIVE,
      listAction: [],
    },
  }),

  setIsAppMenuOpen(isOpen: boolean): void {
    appStore.state.isAppMenuOpen = isOpen;
  },

  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void {
    appStore.state.view[state] = value;
  },

};
