import { PrimeIcons } from 'primereact/api';

import type { AppPageSchema, AppMenuItem, OptionItem } from '@admin/shared/types';
import { ListAction, ListView, PagePath, PageTitle } from '@admin/shared/constants';

export const appMenuItems: AppMenuItem[] = [
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

export const listViewOptions: OptionItem[] = [
  {
    icon: PrimeIcons.LIST,
    value: ListView.TABLE,
  },
  {
    icon: PrimeIcons.TH_LARGE,
    value: ListView.CARD,
  },
];

export const listActionOptions: OptionItem[] = [
  {
    icon: PrimeIcons.CHECK_SQUARE,
    value: ListAction.SELECT,
    label: 'Select',
  },
  {
    icon: PrimeIcons.FILTER,
    value: ListAction.FILTER,
    label: 'Filter',
  },
];
