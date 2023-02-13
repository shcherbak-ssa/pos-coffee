import type { PagePath } from 'modules/admin/shared/constants';

import type { AppController } from './app';
import type { UsersController } from './users';

export * from './app';
export * from './users';

export type Controllers =
  | UsersController
  | AppController;

export type MenuItem = {
  label: string;
  icon?: string;
  to?: PagePath;
  isActive?: boolean;
  items?: MenuItem[];
}
