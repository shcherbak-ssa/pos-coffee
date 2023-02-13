import type { Store } from 'shared/types';

import type { PageTitle } from 'modules/admin/shared/constants';

export type AppPageSchema = {
  title: PageTitle;
}

export type AppState = {
  isAppMenuOpen: boolean;
  currentPage: AppPageSchema | null;
}

export interface AppStore extends Store<AppState> {}

export interface AppStoreActions extends AppStore {
  setCurrentPage(page: AppPageSchema): void;
  setIsAppMenuOpen(isOpen: boolean): void;
}

export interface AppController {
  setCurrentPage(page: AppPageSchema): Promise<void>;
  setIsAppMenuOpen(isOpen: boolean): Promise<void>;
}
