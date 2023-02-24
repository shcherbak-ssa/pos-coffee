import { PrimeIcons } from 'primereact/api';

import type { AppHeaderMenuItem, AppPageSchema } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { EntityName } from 'shared/constants';

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
    icon: PrimeIcons.BOX,
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

export const actionsMenuItemsProps: {
  products: ActionsMenuItemsProps;
  categories: ActionsMenuItemsProps;
} = {
  products: {
    entityName: EntityName.PRODUCT,
    infoPagePath: PagePath.PRODUCTS_INFO,
    controllerName: ControllerName.PRODUCTS,
  },
  categories: {
    entityName: EntityName.CATEGORY,
    infoPagePath: PagePath.EMPTY,
    controllerName: ControllerName.CATEGORIES,
  },
};

export const headerMenuItems: {
  products: AppHeaderMenuItem[];
  categories: AppHeaderMenuItem[];
} = {
  products: [
    { label: 'Products', to: PagePath.PRODUCTS },
    { label: 'Categories', to: PagePath.CATEGORIES },
  ],
  categories: [
    { label: 'Products', to: PagePath.PRODUCTS },
    { label: 'Categories', to: PagePath.CATEGORIES },
  ],
};
