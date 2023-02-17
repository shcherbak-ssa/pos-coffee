import type { ErrorType } from 'shared/constants';

export * from './models';

export type AnyType = {
  [key: string]: string | number | boolean | object | AnyType | AnyType[] | null | undefined;
}

export type Entity = AnyType & {
  id: number;
}

export type Notification = {
  type?: 'result' | 'process',
  severity?: MessageType;
  heading?: React.ReactNode;
  message?: React.ReactNode;
  closable?: boolean;
  sticky?: boolean;
  life?: number;
  className?: string;
}

export type MessageType = 'success' | 'info' | 'warn' | 'error' | undefined;
export type ViewSeverity = 'success' | 'info' | 'warning' | 'danger' | null | undefined;

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

export type NotificationHandler = (notification: Notification) => void;
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

export interface NotificationService {
  addNotification(notification: Notification): void;
  subscribeToNotification(handler: NotificationHandler): void;
  unsubscribeFromNoification(handler: NotificationHandler): void;
  addError<T>(error: ErrorObject<T>): void;
  subscribeToError<T>(errorType: ErrorType, handler: ErrorHandler<T>): void;
  unsubscribeFromError<T>(errorType: ErrorType, handler: ErrorHandler<T>): void;
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
