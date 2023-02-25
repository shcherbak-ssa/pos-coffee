export const IS_ACTIVE_CLASSNAME: string = 'is-active';

export enum ApiEndpoint {
  MENU_CATEGORIES = '/api/app/menu/categories',
  MENU_PRODUCTS = '/api/app/menu/products',
}

export enum ControllerName {
  APP = 'APP',
  MENU = 'MENU',
  ORDERS = 'ORDERS',
}

export enum StoreName {
  APP = 'APP',
  MENU = 'MENU',
  ORDERS = 'ORDERS',
}

export enum ValidationName {
  ORDERS = 'ORDERS',
}

export enum PagePath {
  EMPTY = '',
  HOME = '/app',
  NEW_ORDER = '/app/new-order',
  ORDERS = '/app/orders',
}
