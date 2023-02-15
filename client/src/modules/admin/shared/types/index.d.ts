import type { PagePath, Tab } from '@admin/shared/constants';

import type { AppController } from './app';
import type { UsersController } from './users';

export * from './app';
export * from './users';

export type Controllers =
  | UsersController
  | AppController;

export type MenuItem = {
  label: string;
  icon: string;
  to: PagePath;
}

export type OptionItem = {
  value: string;
  icon: string;
  label?: string;
}

export type LastListPageTabPayload = {
  [key: string]: Tab;
}
