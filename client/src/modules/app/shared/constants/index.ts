export const PRODUCT_COUNT_STEP: number = 1;

export const IS_ACTIVE_CLASSNAME: string = 'is-active';

export enum ApiEndpoint {
  APP_USERS = '/api/app/users',
  CART_ORDERS = '/api/app/cart/orders',
  CART_CATEGORIES = '/api/app/cart/categories',
  CART_PRODUCTS = '/api/app/cart/products',
}

export enum ControllerName {
  APP = 'APP',
  CART = 'CART',
  ORDERS = 'ORDERS',
}

export enum StoreName {
  APP = 'APP',
  CART = 'CART',
  ORDERS = 'ORDERS',
}

export enum ValidationName {
  ORDERS = 'ORDERS',
}

export enum PagePath {
  EMPTY = '',
  HOME = '/app',
  CART = '/app/cart',
  ORDERS = '/app/orders',
}
