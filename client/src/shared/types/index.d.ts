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
  get<P, Q, B, R>(apiRequest: ApiRequest<P, Q, B>): Promise<R>;
  post<P, Q, B, R>(apiRequest: ApiRequest<P, Q, B>): Promise<R>;
  put<P, Q, B>(apiRequest: ApiRequest<P, Q, B>): Promise<void>;
  delete<P, Q, B>(apiRequest: ApiRequest<P, Q, B>): Promise<void>;
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

export type ApiRequest<P, Q, B> = {
  endpoint: ApiEndpoint;
  params?: P;
  query?: Q;
  body?: B;
}
