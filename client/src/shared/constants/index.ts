export const APP_NAME: string = 'POS`Coffee';

export const EMPTY_STRING: string = '';
export const PAGE_TITLE_DIVIDER: string = ' | ';
export const QUERY_URL_SEPARATOR: string = '?';

export enum PagePath {
  ROOT = '/',
}

export enum ErrorName {
  API_ERROR = 'ApiError',
  VALIDATION_ERROR = 'ValidationError',
}

export enum ErrorType {
  SERVER = 'server',
  CLIENT = 'client',
  VALIDATION = 'validation',
}

export enum ValidationSchemaName {
  LOGIN = 'login',
}

export enum LocalStorageKey {
  USER_TOKEN = 'user-token',
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
