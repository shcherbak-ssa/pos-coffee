import type { ErrorType, EntityName, UserType } from 'shared/constants';

/**
 * Helpers
 */

export type AnyType = {
  [key: string]: string | number | boolean | object | AnyType | AnyType[] | null | undefined;
}

export type EmptyFunction<T = void> = () => T;

export type Entity = AnyType & {
  id: number;
  isArchived?: boolean;
}

export type EntityComponentProps<T> = {
  entity: T;
  className?: string;
}

export type MessageType = 'success' | 'info' | 'warn' | 'error' | undefined;
export type ViewSeverity = 'success' | 'info' | 'warning' | 'danger' | null | undefined;
export type ValidationType = 'toCreate' | 'toUpdate';
export type ArchiveAction = 'archive' | 'restore';

/**
 * Entities
 */

export type ValidationSchema<T> = {
  [key in ValidationType]: T;
}

export type Token = {
  token: string;
  type: string;
}

export type UserSchema = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  type: UserType;
  photo: string;
  address: AddressSchema | null;
  isArchived: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  archivedAt: Date | null;
}

export type AddressSchema = {
  id: number;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type AddressUpdates = Partial<AddressSchema>;

export type AddressDraft = {
  set country(country: string);
  set state(state: string);
  set city(city: string);
  set zipCode(zipCode: string);
  set address(address: string);
}

/**
 * Notifications and errors
 */

export type NotificationHandler = (notification: Notification) => void;
export type ErrorHandler<T> = (error: ErrorObject<T>) => void;

export type Notification = Partial<{
  type: 'result' | 'process',
  severity: MessageType;
  heading: string;
  message: string;
  closable: boolean;
  sticky: boolean;
  life: number;
  className: string;
}>

export type Errors<T> = {
  [key in keyof T]?: string;
}

export type ErrorObject<T> = {
  type: ErrorType;
  message: string;
  errors: Errors<T>;
}

/**
 * Controllers
 */

export type Controller = {}
export type ControllerList = Map<string, Controller>;

export interface CrudController<T = Entity, F = {}> extends Controller {
  loadById(entityId: number): Promise<boolean>;
  loadAll(filter?: F): Promise<boolean>;
  save(entity: T): Promise<number | undefined>;
  delete(entityId: number): Promise<boolean>;
  restore(entityId: number): Promise<boolean>;
}

export type PayloadToGetById = {
  endpoint: string;
  entityId: number;
}

export type PayloadToGetAll<T> = {
  endpoint: string;
  filter: T;
}

export type PayloadToSave<T> = {
  endpoint: string;
  entity: T;
  isEntityNew: boolean;
  validationName: string;
  entityName: EntityName;
}

export type PayloadToChangeArchiveState = {
  endpoint: string;
  action: ArchiveAction;
  entityId: number;
  entityName: EntityName;
}

/**
 * Store
 */

export type Store = {}
export type StoreList = Map<string, Store>;

export interface StoreState<T = AnyType> extends Store {
  readonly state: T;
}

export interface StoreCrud<T = AnyType> extends Store {
  add(entities: T[]): void;
  save(entity: T): void;
  remove(entityId: number): void;
  selected: StoreSelected<T>;
}

export interface StoreSelected<T> {
  set(entityId: number): void;
  hadUpdates(): boolean;
  getUpdates(): Partial<T>;
}

/**
 * Services
 */

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

export interface ValidationService {
  validate<T>(type: ValidationType, schemaName: string, object: T): Promise<void>
  validateToCreate<T>(schemaName: string, object: T): Promise<void>;
  validateToUpdate<T>(schemaName: string, object: T): Promise<void>;
}
