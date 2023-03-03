import { PrimeIcons } from 'primereact/api';

import type { AppMenuItem } from '@admin/shared/types';
import { PageTitle, PagePath } from '@admin/shared/constants';

export const appMenuItems: AppMenuItem[] = [
  {
    label: PageTitle.HOME,
    icon: PrimeIcons.HOME,
    to: PagePath.HOME,
  },
  {
    label: PageTitle.PRODUCTS,
    icon: PrimeIcons.BOX,
    to: PagePath.PRODUCTS,
  },
  {
    label: PageTitle.ORDERS,
    icon: PrimeIcons.SHOPPING_BAG,
    to: PagePath.ORDERS,
  },
  {
    label: PageTitle.USERS,
    icon: PrimeIcons.USER,
    to: PagePath.USERS,
  },
  {
    label: PageTitle.SETTINGS,
    icon: PrimeIcons.COG,
    to: PagePath.SETTINGS,
  },
];
