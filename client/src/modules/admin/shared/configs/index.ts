import { PrimeIcons } from 'primereact/api';

import type { Notification } from 'shared/types';

import type { AppPageSchema, AppMenuItem, OptionItem, ActionMenuItem } from '@admin/shared/types';
import { Action, Entity, ListAction, ListView, PagePath, PageTitle } from '@admin/shared/constants';

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

export const entityActionsMenuItems: ActionMenuItem[] = [
  {
    label: 'View',
    icon: PrimeIcons.EYE,
    action: Action.VIEW,
  },
  {
    label: 'Edit',
    icon: PrimeIcons.PENCIL,
    action: Action.EDIT,
  },
  {
    label: 'Delete',
    icon: PrimeIcons.TRASH,
    action: Action.DELETE,
  },
  {
    label: 'Restore',
    icon: PrimeIcons.REPLAY,
    action: Action.RESTORE,
  },
];

export const notifications: {
  created: (entity: Entity) => Notification,
  updated: (entity: Entity) => Notification,
  deleted: (entity: Entity) => Notification,
  restored: (entity: Entity) => Notification,
  createProcess: (entity: Entity) => Notification,
  updateProcess: (entity: Entity) => Notification,
  deleteProcess: (entity: Entity) => Notification,
  restoreProcess: (entity: Entity) => Notification,
} = {
  created: (entity: Entity) => ({
    severity: 'success',
    heading: 'Created',
    message: `${entity} created successfully`,
  }),
  updated: (entity: Entity) => ({
    severity: 'success',
    heading: 'Updated',
    message: `${entity} updated successfully`,
  }),
  deleted: (entity: Entity) => ({
    severity: 'success',
    heading: 'Deleted',
    message: `${entity} deleted successfully`,
  }),
  restored: (entity: Entity) => ({
    severity: 'success',
    heading: 'Restored',
    message: `${entity} restored successfully`,
  }),
  createProcess: (entity: Entity) => ({
    type: 'process',
    severity: 'info',
    heading: 'Creating...',
    message: `A new ${entity.toLowerCase()} is being created`,
  }),
  updateProcess: (entity: Entity) => ({
    type: 'process',
    severity: 'info',
    heading: 'Updating...',
    message: `A new ${entity.toLowerCase()} is being updated`,
  }),
  deleteProcess: (entity: Entity) => ({
    type: 'process',
    severity: 'info',
    heading: 'Deleting...',
    message: `A new ${entity.toLowerCase()} is being deleted`,
  }),
  restoreProcess: (entity: Entity) => ({
    type: 'process',
    severity: 'info',
    heading: 'Restoring...',
    message: `A new ${entity.toLowerCase()} is being restored`,
  }),
};
