export const GO_BACK: number = -1;

export enum ApiEndpoint {
  USERS = '/api/admin/users',
  USERS_ID = '/api/admin/users/:id',
  USERS_ARCHIVE = '/api/admin/users/:id/archive',
  USERS_RESTORE = '/api/admin/users/:id/restore',
  PRODUCTS = '/api/admin/products',
  PRODUCTS_ID = '/api/admin/products/:id',
  PRODUCTS_ARCHIVE = '/api/admin/products/:id/archive',
  PRODUCTS_RESTORE = '/api/admin/products/:id/restore',
  CATEGORIES = '/api/admin/categories',
  CATEGORIES_ARCHIVE = '/api/admin/categories/:id/archive',
  CATEGORIES_RESTORE = '/api/admin/categories/:id/restore',
}

export enum ControllerName {
  APP = 'APP',
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
}

export enum StoreName {
  APP = 'APP',
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
}

export enum ValidationName {
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
  CATEGORIES = 'CATEGORIES',
}

export enum PagePath {
  EMPTY = '',
  HOME = '/admin',
  DASHBOARD = '/admin/dashboard',
  PRODUCTS = '/admin/products',
  PRODUCTS_INFO = '/admin/products/:id',
  PRODUCTS_CREATE = '/admin/products/create',
  PRODUCTS_EDIT = '/admin/products/:id/edit',
  CATEGORIES = '/admin/products/categories',
  ORDERS = '/admin/orders',
  USERS = '/admin/users',
  USERS_INFO = '/admin/users/:id',
  USERS_CREATE = '/admin/users/create',
  USERS_EDIT = '/admin/users/:id/edit',
  SETTINGS = '/admin/settings',
}

export enum PagePathLabel {
  CREATE = 'create',
  EDIT = 'edit',
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
  ARCHIVE = 'ARCHIVE',
}

export enum Action {
  VIEW = 'VIEW',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  UPDATE = 'UPDATE',
  ARCHIVE = 'ARCHIVE',
  RESTORE = 'RESTORE',
}
