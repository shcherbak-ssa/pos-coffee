import type { Action, ListTab, PagePath } from '@admin/shared/constants';

import type { AppController } from './app';
import type { UsersController } from './users';

export * from './app';
export * from './users';

export type Controllers =
  | UsersController
  | AppController;

export type AppMenuItem = {
  label: string;
  icon: string;
  to: PagePath;
}

export type OptionItem = {
  value: string;
  icon: string;
  label?: string;
}

export type TabItem = {
  label: string;
  listTab: ListTab;
  command: () => void;
}

export type ActionMenuItem = {
  label: string;
  icon: string;
  action: Action;
}

export type ActionMenuItemOverride = {
  action: Action;
  command: (id: number) => void;
  isVisible: (id?: number) => boolean;
}
