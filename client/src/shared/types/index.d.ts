import type { ApiEndpoint, ControllerName, ErrorType, ValidationSchemaName } from 'shared/constants';

export * from './users';

export interface Controller {}

export type ValidationSchema<T> = {
  schemaToCreate: T;
  schemaToUpdate: T;
}

export type Token = {
  token: string;
  type: string;
}

export type ErrorHandler<T> = (error: ErrorObject<T>) => void;

export type Errors<T> = {
  [key in keyof T]?: string;
}

export type ErrorObject<T> = {
  type: ErrorType;
  message: string;
  errors: Errors<T>;
}

export interface ApiService {
  addParams<T>(params: T): ApiService;
  addQuery<T>(query: T): ApiService;
  addBody<T>(body: T): ApiService;
  get<T>(endpoint: ApiEndpoint): Promise<T>;
  post<T>(endpoint: ApiEndpoint): Promise<T>;
  put(endpoint: ApiEndpoint): Promise<void>;
  delete(endpoint: ApiEndpoint): Promise<void>;
}

export interface ErrorService {
  addError<T>(error: ErrorObject<T>): void;
  subscribe<T>(errorType: ErrorType, handler: ErrorHandler<T>): void;
  unsubscribe<T>(errorType: ErrorType, handler: ErrorHandler<T>): void;
}

export interface LoaderService {
  loadController(name: ControllerName): Promise<Controller>;
  loadValidationSchema<T>(schemaName: ValidationSchemaName): Promise<ValidationSchema<T>>;
}

export interface StoreService {}

export interface ValidationService {
  validateToCreate<T>(schemaName: ValidationSchemaName, object: T): Promise<void>;
  validateToUpdate<T>(schemaName: ValidationSchemaName, object: T): Promise<void>;
}
