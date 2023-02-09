import type { ApiEndpoint, ControllerName, ErrorType, ValidationSchemaName } from 'shared/constants';

import type { LoginController } from './login';
import type { UsersController } from './users';

export * from './login';
export * from './users';

export type Controller =
  | LoginController
  | UsersController;

export interface LoaderService {
  loadController(name: ControllerName): Promise<Controller>;
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

export interface ValidationService {
  validateToCreate<T>(schemaName: ValidationSchemaName, object: T): Promise<void>;
  validateToUpdate<T>(schemaName: ValidationSchemaName, object: T): Promise<void>;
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
