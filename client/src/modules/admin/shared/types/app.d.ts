import type { StoreState } from 'shared/types';

import type { ListView, ListAction, ListTab , PagePath } from '@admin/shared/constants';

export type AppPageSchema = {
  title: string;
  icon?: string;
  to?: PagePath;
  child?: AppPageSchema;
}

export type AppViewState = {
  listView: ListView;
  listAction: ListAction[];
  listTab: ListTab;
}

export type AppState = {
  isAppMenuOpen: boolean;
  view: AppViewState;
}

export interface AppStore extends StoreState<AppState> {}

export interface AppStoreActions extends AppStore {
  setIsAppMenuOpen(isOpen: boolean): void;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void;
}

export interface AppController {
  setIsAppMenuOpen(isOpen: boolean): Promise<void>;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): Promise<void>;
}
