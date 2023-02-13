import { PrimeIcons } from 'primereact/api';

import type { MenuItem } from 'modules/admin/shared/types';
import { PagePath } from 'modules/admin/shared/constants';

export const appMenuItems: MenuItem[] = [
  {
    label: 'Home',
    icon: PrimeIcons.HOME,
    to: PagePath.HOME,
  },
  {
    label: 'Dashboard',
    icon: PrimeIcons.CHART_BAR,
    to: PagePath.DASHBOARD,
  },
  {
    label: 'Sites',
    icon: PrimeIcons.MAP_MARKER,
    to: PagePath.SITES,
  },
  {
    label: 'Products',
    icon: PrimeIcons.BOX,
    to: PagePath.PRODUCTS,
  },
  // @TODO: move to another place
  // {
  //   label: 'Categories',
  //   icon: PrimeIcons.TAGS,
  //   to: PagePath.CATEGORIES,
  // },
  // {
  //   label: 'Stock',
  //   icon: PrimeIcons.SHOPPING_CART,
  //   to: PagePath.STOCK,
  // },
  {
    label: 'Orders',
    icon: PrimeIcons.SHOPPING_BAG,
    to: PagePath.ORDERS,
  },
  {
    label: 'Users',
    icon: PrimeIcons.USERS,
    to: PagePath.USERS,
  },
  {
    label: 'Settings',
    icon: PrimeIcons.COG,
    to: PagePath.SETTINGS,
  },
];
