import type { Store } from 'shared/types';

import type { PagePath } from '@admin/shared/constants';

export type AppPageSchema = {
  title: string;
  icon?: string;
  to?: PagePath;
  child?: AppPageSchema;
}

export type AppState = {
  isAppMenuOpen: boolean;
}

export interface AppStore extends Store<AppState> {}

export interface AppStoreActions extends AppStore {
  setIsAppMenuOpen(isOpen: boolean): void;
}

export interface AppController {
  setIsAppMenuOpen(isOpen: boolean): Promise<void>;
}
