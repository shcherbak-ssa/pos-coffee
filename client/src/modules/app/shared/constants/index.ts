export const PRODUCT_COUNT_STEP: number = 1;

export const IS_ACTIVE_CLASSNAME: string = 'is-active';

export enum ApiEndpoint {
  APP_USERS = '/api/app/users',
  APP_ORDERS = '/api/app/orders',
  APP_CATEGORIES = '/api/app/categories',
  APP_PRODUCTS = '/api/app/products',
}

export enum ControllerName {
  APP = 'APP',
  CART = 'CART',
}

export enum StoreName {
  APP = 'APP',
  CART = 'CART',
}

export enum PagePath {
  EMPTY = '',
  HOME = '/app',
  CART = '/app/cart',
}
