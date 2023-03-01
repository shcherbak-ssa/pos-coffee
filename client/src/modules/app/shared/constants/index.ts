export const PRODUCT_COUNT_STEP: number = 1;
export const ONE_HUNDRED_PERCENT: number = 100;

export const IS_ACTIVE_CLASSNAME: string = 'is-active';

export enum ApiEndpoint {
  APP_SETTINGS = '/api/app/settings',
  APP_HOME = '/api/app/home',
  APP_MENU = '/api/app/menu',
  APP_ORDERS = '/api/app/orders',
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
