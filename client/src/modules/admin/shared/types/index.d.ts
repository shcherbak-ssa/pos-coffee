import type { EmptyFunction } from 'shared/types';

import type { Action, ListTab, PagePath } from '@admin/shared/constants';

import type { AppController } from './app';
import type { UsersController } from './users';

export * from './app';
export * from './users';
export * from './props';

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
  command: EmptyFunction;
}

export type ActionMenuItem = {
  label: string;
  icon: string;
  action: Action;
}
