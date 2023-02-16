export const DEFAULT_ERROR_MESSAGE: string = 'Something went wrong!';
export const CREATE_NEW_LABEL: string = 'create';

export enum ApiEndpoint {
  USERS = '/api/admin/users',
  USERS_ID = '/api/admin/users/:id',
  USERS_DELETE = '/api/admin/users/:id/delete',
  USERS_RESTORE = '/api/admin/users/:id/restore',
}

export enum ControllerName {
  APP = 'APP',
  USERS = 'USERS',
}

export enum StoreName {
  APP = 'APP',
  USERS = 'USERS',
}

export enum ValidationName {
  USERS = 'USERS',
}

export enum PagePath {
  HOME = '/admin',
  DASHBOARD = '/admin/dashboard',
  PRODUCTS = '/admin/products',
  CATEGORIES = 'admin/products/categories',
  STOCK = '/admin/products/stock',
  ORDERS = '/admin/orders',
  USERS = '/admin/users',
  USERS_INFO = '/admin/users/:id',
  USERS_CREATE = '/admin/users/create',
  USERS_EDIT = '/admin/users/:id/edit',
  SETTINGS = '/admin/settings',
}

export enum PageTitle {
  HOME = 'Home',
  DASHBOARD = 'Dashboard',
  PRODUCTS = 'Products',
  CATEGORIES = 'Categories',
  STOCK = 'Stock',
  ORDERS = 'Orders',
  USERS = 'Users',
  SETTINGS = 'Settings',
}

export enum ListView {
  TABLE = 'TABLE',
  CARD = 'CARD',
}

export enum ListAction {
  SELECT = 'SELECT',
  FILTER = 'FILTER',
}

export enum ListTab {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}

export enum Action {
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  RESTORE = 'RESTORE',
}

export enum Entity {
  USER = 'User',
}

export enum CssClasses {
  CLICK = 'click',
  CARD_ACTIVE = 'card-active',
}
