export const NAVIGATE_BACK: number = -1;
export const STOCK_ALERT_DISTANCE: number = 2;

export const DEFAULT_CATEGORY_NAME: string = 'DEFAULT';
export const NEW_ENTITY_LABEL: string = 'new';

export enum ApiEndpoint {
  APP_PRODUCT_CATEGORIES = '/api/admin/app/productCategories',
  USERS = '/api/admin/users',
  USERS_ID = '/api/admin/users/:id',
  USERS_ARCHIVE = '/api/admin/users/:id/archive',
  USERS_RESTORE = '/api/admin/users/:id/restore',
  PRODUCTS = '/api/admin/products',
  PRODUCTS_ID = '/api/admin/products/:id',
  PRODUCTS_ARCHIVE = '/api/admin/products/:id/archive',
  PRODUCTS_RESTORE = '/api/admin/products/:id/restore',
  CATEGORIES = '/api/admin/categories',
  CATEGORIES_ID = '/api/admin/categories/:id',
  PRODUCT_VARIANTS = '/api/admin/products/variants',
  PRODUCT_VARIANTS_ID = '/api/admin/products/variants/:id',
  ORDERS = '/api/admin/orders',
  ORDERS_ID = '/api/admin/orders/:id',
}

export enum ControllerName {
  APP = 'APP',
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
  PRODUCT_VARIANTS = 'PRODUCT_VARIANTS',
  ORDERS = 'ORDERS',
}

export enum StoreName {
  APP = 'APP',
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
  PRODUCT_VARIANTS = 'PRODUCT_VARIANTS',
  ORDERS = 'ORDERS',
}

export enum ValidationName {
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
  PRODUCT_VARIANTS = 'PRODUCT_VARIANTS',
}

export enum PagePath {
  EMPTY = '',
  HOME = '/admin',
  DASHBOARD = '/admin/dashboard',
  PRODUCTS = '/admin/products',
  PRODUCTS_INFO = '/admin/products/:id',
  CATEGORIES = '/admin/products/categories',
  ORDERS = '/admin/orders',
  ORDERS_INFO = '/admin/orders/:id',
  USERS = '/admin/users',
  USERS_INFO = '/admin/users/:id',
  SETTINGS = '/admin/settings',
}

export enum PageTitle {
  HOME = 'Home',
  DASHBOARD = 'Dashboard',
  PRODUCTS = 'Products',
  CATEGORIES = 'Categories',
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
  ARCHIVED = 'ARCHIVED',
}

export enum Action {
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  UPDATE = 'UPDATE',
  ARCHIVE = 'ARCHIVE',
  RESTORE = 'RESTORE',
  DELETE = 'DELETE',
}

export enum ControlGroup {
  ACTIONS = 'ACTIONS',
  VIEWS = 'VIEWS',
}
