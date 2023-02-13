import { PrimeIcons } from 'primereact/api';

import type { AppPageSchema, MenuItem } from 'modules/admin/shared/types';
import { PagePath, PageTitle } from 'modules/admin/shared/constants';

export const appMenuItems: MenuItem[] = [
  {
    label: PageTitle.HOME,
    icon: PrimeIcons.HOME,
    to: PagePath.HOME,
  },
  {
    label: PageTitle.DASHBOARD,
    icon: PrimeIcons.CHART_BAR,
    to: PagePath.DASHBOARD,
  },
  {
    label: PageTitle.SITES,
    icon: PrimeIcons.MAP_MARKER,
    to: PagePath.SITES,
  },
  {
    label: PageTitle.PRODUCTS,
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
    label: PageTitle.ORDERS,
    icon: PrimeIcons.SHOPPING_BAG,
    to: PagePath.ORDERS,
  },
  {
    label: PageTitle.USERS,
    icon: PrimeIcons.USERS,
    to: PagePath.USERS,
  },
  {
    label: PageTitle.SETTINGS,
    icon: PrimeIcons.COG,
    to: PagePath.SETTINGS,
  },
];

export const pages: { [key in PageTitle]: AppPageSchema } = {
  [PageTitle.HOME]: {
    title: PageTitle.HOME,
    icon: PrimeIcons.HOME,
  },
  [PageTitle.DASHBOARD]: {
    title: PageTitle.DASHBOARD,
    icon: PrimeIcons.CHART_BAR,
  },
  [PageTitle.SITES]: {
    title: PageTitle.SITES,
    icon: PrimeIcons.MAP_MARKER,
  },
  [PageTitle.PRODUCTS]: {
    title: PageTitle.PRODUCTS,
    icon: PrimeIcons.BOX,
  },
  [PageTitle.CATEGORIES]: {
    title: PageTitle.CATEGORIES,
    icon: PrimeIcons.TAGS,
  },
  [PageTitle.STOCK]: {
    title: PageTitle.STOCK,
    icon: PrimeIcons.SHOPPING_CART,
  },
  [PageTitle.ORDERS]: {
    title: PageTitle.ORDERS,
    icon: PrimeIcons.SHOPPING_BAG,
  },
  [PageTitle.USERS]: {
    title: PageTitle.USERS,
    icon: PrimeIcons.USERS,
  },
  [PageTitle.SETTINGS]: {
    title: PageTitle.SETTINGS,
    icon: PrimeIcons.COG,
  },
};
