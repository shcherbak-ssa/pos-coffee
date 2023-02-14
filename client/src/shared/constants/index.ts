export const APP_NAME: string = 'POS`Coffee';

export const ZERO: number = 0;
export const NOTIFICATION_LIFE: number = 10000;

export const EMPTY_STRING: string = '';
export const PAGE_TITLE_DIVIDER: string = ' | ';
export const QUERY_URL_SEPARATOR: string = '?';
export const AUTHORIZATION_HEADER: string = 'Authorization';
export const ROOT_PAGE_PATH: string = '/';
export const CURRENT_USER_API_ENDPOINT: string = '/api/users';

export enum UserType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
}

export enum ErrorName {
  APP_ERROR = 'AppError',
  AUTH_ERROR = 'AuthError',
  API_ERROR = 'ApiError',
  VALIDATION_ERROR = 'ValidationError',
  PROGER_ERROR = 'ProgerError',
}

export enum ErrorType {
  AUTH = 'AUTH',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  VALIDATION = 'VALIDATION',
}

export enum LocalStorageKey {
  USER_TOKEN = 'USER_TOKEN',
  LAST_URL = 'LAST_URL',
}

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ApiResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}
