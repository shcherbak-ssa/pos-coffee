export const APP_NAME: string = 'POS`Coffee';

export const ZERO: number = 0;

export const EMPTY_STRING: string = '';
export const PAGE_TITLE_DIVIDER: string = ' | ';
export const QUERY_URL_SEPARATOR: string = '?';

export enum UserType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
}

export enum ControllerName {
  LOGIN = 'LOGIN',
  USERS = 'USERS',
}

export enum PagePath {
  ROOT = '/',
  LOGIN = '/login',
}

export enum ErrorName {
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

export enum ValidationSchemaName {
  LOGIN = 'LOGIN',
  USERS = 'USERS',
}

export enum LocalStorageKey {
  USER_TOKEN = 'user-token',
  LAST_URL = 'last-url',
}

export enum ApiEndpoint {
  LOGIN = '/api/auth/login',
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
}
