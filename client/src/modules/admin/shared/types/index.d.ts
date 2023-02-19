import type {
  EmptyFunction,
  StoreState,
  UserSchema,
  AddressDraft,
  AddressUpdates,
  StoreCrud,
  CrudController,
  ProductSchema,
  StoreEntityState,
} from 'shared/types';
import type { UserType } from 'shared/constants';

import type { Action, ListView, ListAction, ListTab, PagePath } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';

/**
 * Helpers
 */

export type Controllers =
  | UsersController
  | AppController
  | ProductsController;

export type AppMenuItem = {
  label: string;
  icon: string;
  to: PagePath;
}

export type OptionItem = {
  value: string;
  icon: string;
  label?: string;
}

export type TabItem = {
  label: string;
  listTab: ListTab;
  command: EmptyFunction;
}

export type ActionMenuItem = {
  label: string;
  icon: string;
  action: Action;
}

/**
 * Props
 */

export type PageAddButtonProps = {
  label: string;
  to: PagePath;
}

export type AppComponentProps = {
  isAppMenuOpen: boolean;
  appController: AppController;
}

export type PageComponentProps = {
  view: AppViewState;
  appController: AppController;
}

export type EntityViewComponentProps<T> = {
  entities: T[];
  selectEntity: (entity: T) => void;
  isSelectEnable: boolean;
  selectedEntities: T[];
  setSelectedEntities: (entities: T[]) => void;
  actionsMenuItemsProps: ActionsMenuItemsProps;
}

/**
 * App
 */

export type AppPageSchema = {
  title: string;
  icon?: string;
  to?: PagePath;
  child?: AppPageSchema;
}

export type AppViewState = {
  listView: ListView;
  listAction: ListAction[];
  listTab: ListTab;
}

export type AppState = {
  currentUser: UserSchema;
  isAppMenuOpen: boolean;
  view: AppViewState;
}

export interface AppStore extends StoreState<AppState> {}

export interface AppStoreActions extends AppStore {
  setCurrentUser(user: UserSchema): void;
  setIsAppMenuOpen(isOpen: boolean): void;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void;
}

export interface AppController {
  setCurrentUser(user: UserSchema): Promise<void>;
  setIsAppMenuOpen(isOpen: boolean): Promise<void>;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): Promise<void>;
}

/**
 * Users
 */

export type UserUpdates = Partial<Omit<UserSchema, 'address'> & {
  address: AddressUpdates;
}>

export type UsersFilter = Partial<{
  onlyArchived: boolean;
}>

export type UserDraft = {
  get fullname(): string;
  get address(): AddressDraft;
  set name(name: string);
  set surname(surname: string);
  set email(email: string);
  set phone(phone: string);
  set type(type: UserType);
}

export type UsersState = {}

export interface UsersStore extends StoreEntityState<UsersState, UserSchema, UserDraft> {}

export interface UsersStoreActions extends StoreCrud<UserSchema> {}

export interface UsersController extends CrudController<UserSchema, UsersFilter> {}

/**
 * Products
 */

export type ProductUpdates = Partial<ProductSchema>;

export type ProductsFilter = Partial<{
  onlyArchived: boolean;
}>

export type ProductDraft = {
  set sku(sku: string);
  set name(name: string);
  set price(price: number);
  set photo(photo: string);
}

export type ProductsState = {}

export interface ProductsStore extends StoreEntityState<ProductsState, ProductSchema, ProductDraft> {}

export interface ProductsStoreActions extends StoreCrud<ProductSchema> {}

export interface ProductsController extends CrudController<ProductSchema, ProductsFilter> {}
