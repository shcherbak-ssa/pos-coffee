import type { Store } from 'shared/types';

import type { PageTitle } from 'modules/admin/shared/constants';

export type AppPageSchema = {
  icon: string;
  title: PageTitle;
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
