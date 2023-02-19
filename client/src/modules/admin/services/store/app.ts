import { proxy } from 'valtio';

import { EMPTY_STRING } from 'shared/constants';

import type { AppPageSchema, AppState, AppStore, AppStoreActions, AppViewState } from '@admin/shared/types';
import { ListView, ListTab } from '@admin/shared/constants';
import { UserSchema } from '@admin/models/user';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    currentPage: { title: EMPTY_STRING },
    currentUser: UserSchema.create(),
    isAppMenuOpen: false,

    view: {
      listView: ListView.TABLE,
      listTab: ListTab.ACTIVE,
      listAction: [],
    },
  }),

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
