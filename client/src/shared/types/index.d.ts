import type { ErrorType, UserType } from 'shared/constants';

export type CurrentUserSchema = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  type: UserType;
}

export type AnyType = {
  [key: string]: string | number | boolean | AnyType | AnyType[] | null | undefined;
}

export type Controller = {}
export type ControllerList = Map<string, Controller>

export type Store<T = AnyType> = { readonly state: T }
export type StoreList = Map<string, Store>;

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
  get<T>(endpoint: string): Promise<T>;
  post<T>(endpoint: string): Promise<T>;
  put(endpoint: string): Promise<void>;
  delete(endpoint: string): Promise<void>;
}

export interface ErrorService {
  addError<T>(error: ErrorObject<T>): void;
  subscribe<T>(errorType: ErrorType, handler: ErrorHandler<T>): void;
  unsubscribe<T>(errorType: ErrorType, handler: ErrorHandler<T>): void;
}

export interface LoaderService {
  loadController(name: string): Promise<Controller>;
  loadStore(name: string): Promise<Store>;
  loadValidationSchema<T>(schemaName: string): Promise<ValidationSchema<T>>;
}

export interface StoreService {}

export interface ValidationService {
  validateToCreate<T>(schemaName: string, object: T): Promise<void>;
  validateToUpdate<T>(schemaName: string, object: T): Promise<void>;
}
