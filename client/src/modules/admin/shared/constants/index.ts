export const DEFAULT_ERROR_MESSAGE: string = 'Something went wrong!';
export const CREATE_NEW_LABEL: string = 'new';

export enum ApiEndpoint {
  USERS = '/api/admin/users',
  USERS_ID = '/api/admin/users/:id',
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
  SITES = '/admin/sites',
  PRODUCTS = '/admin/products',
  CATEGORIES = 'admin/products/categories',
  STOCK = '/admin/products/stock',
  ORDERS = '/admin/orders',
  USERS = '/admin/users',
  USERS_INFO = '/admin/users/:id',
  SETTINGS = '/admin/settings',
}

export enum PageTitle {
  HOME = 'Home',
  DASHBOARD = 'Dashboard',
  SITES = 'Sites',
  PRODUCTS = 'Products',
  CATEGORIES = 'Categories',
  STOCK = 'Stock',
  ORDERS = 'Orders',
  USERS = 'Users',
  SETTINGS = 'Settings',
}

export enum ListView {
  LIST = 'LIST',
  CARD = 'CARD',
}

export enum ListAction {
  SELECT = 'SELECT',
  FILTER = 'FILTER',
}

export enum Action {
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
