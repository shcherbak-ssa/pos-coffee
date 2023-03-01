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
  ErrorObject,
  CategorySchema,
  ProductCategory,
  ProductVariantSchema,
  OrderSchema,
  Entity,
  SettingsSchema,
} from 'shared/types';
import type { Currency, UserType } from 'shared/constants';

import type { Action, ListView, ListAction, ListTab, PagePath } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';

/**
 * Helpers
 */

export type Controllers =
  | UsersController
  | AppController
  | ProductsController
  | CategoriesController
  | ProductVariantsController
  | OrdersController;

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
  icon?: string;
  to?: PagePath;
  command?: EmptyFunction;
}

export type AppComponentProps = {
  appStore: AppStore;
  appController: AppController;
}

export type EntityViewComponentProps<T extends Entity> = {
  entities: T[];
  selectEntity: (entity: T) => void;
  isSelectEnable: boolean;
  selectedEntities: T[];
  setSelectedEntities: (entities: T[]) => void;
  actionsMenuItemsProps?: ActionsMenuItemsProps;
}

export type CardWithInputsProps<T, D> = {
  entity: T;
  entityDraft: D;
  isEditMode: boolean;
  validationError: ErrorObject<T> | undefined;
  className?: string;
}

/**
 * App
 *
 * + (Settings, ProductCategory)
 */

export type AppPageSchema = {
  title: string;
  icon?: string;
  to?: PagePath;
  child?: AppPageSchema;
  headerMenuItem?: AppHeaderMenuItem[];
}

export type AppHeaderMenuItem = {
  label: string;
  to: PagePath;
}

export type AppViewState = {
  listView: ListView;
  listAction: ListAction[];
  listTab: ListTab;
}

export type SettingsUpdates = Partial<SettingsSchema>;

export type AppState = {
  settings: SettingsSchema;
  settingsUpdates: SettingsSchema;
  productCategories: ProductCategory[];
  currentPage: AppPageSchema;
  currentUser: UserSchema;
  selectedEntityTitle: string;
  isAppMenuOpen: boolean;
  isEditMode: boolean;
  view: AppViewState;
}

export interface SettingsDraft {
  set currency(currency: Currency);
  set taxes(taxes: number);
}

export interface AppStore extends StoreState<AppState> {
  settingsDraft: SettingsDraft;
}

export interface AppStoreActions extends AppStore {
  setSettings(settings: SettingsSchema): void;
  hasSettingsUpdates(): boolean;
  getSettingsUpdates(): SettingsUpdates;
  setProductCategories(productCategories: ProductCategory[]): void;
  setCurrentPage(page: AppPageSchema): void;
  setCurrentUser(user: UserSchema): void;
  setSelectedEntityTitle(title: string): void;
  setIsAppMenuOpen(isOpen: boolean): void;
  setIsEditMode(isEditMode: boolean): void;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void;
}

export interface AppController {
  loadSettings(): Promise<void>;
  updateSettings(): Promise<boolean>;
  loadProductCategories(): Promise<void>;
  setCurrentPage(page: AppPageSchema): Promise<void>;
  setCurrentUser(user: UserSchema): Promise<void>;
  setSelectedEntityTitle(title: string): Promise<void>;
  setIsAppMenuOpen(isOpen: boolean): Promise<void>;
  setIsEditMode(isEditMode: boolean): Promise<void>;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): Promise<void>;
}

/**
 * Users
 */

export type UserUpdates = Partial<Omit<UserSchema, 'address'> & {
  address: AddressUpdates;
}>

export type UsersFilter = Partial<{
  isArchived: boolean;
}>

export type UserDraft = {
  get address(): AddressDraft;
  set name(name: string);
  set surname(surname: string);
  set email(email: string);
  set image(image: string);
  set type(type: UserType);
}

export type UsersState = {}

export interface UsersStore extends StoreEntityState<UsersState, UserSchema, UserDraft> {}

export interface UsersStoreActions extends StoreCrud<UserSchema> {}

export interface UsersController extends CrudController<UsersFilter> {}

/**
 * Products
 */

export type ProductUpdates = Partial<ProductSchema>;

export type ProductsFilter = Partial<{
  isArchived: boolean;
}>

export type ProductDraft = {
  set sku(sku: string);
  set name(name: string);
  set price(price: number);
  set stock(stock: number);
  set stockPerTime(stockPerTime: number);
  set stockAlert(stockAlert: number);
  set image(image: string);
  set category(category: ProductCategory);
  set isAvailable(isAvailable: boolean);
}

export type ProductsState = {}

export interface ProductsStore extends StoreEntityState<ProductsState, ProductSchema, ProductDraft> {}

export interface ProductsStoreActions extends StoreCrud<ProductSchema> {}

export interface ProductsController extends CrudController<ProductsFilter> {}

/**
 * Categories
 */

export type CategoryUpdates = Partial<CategorySchema>;

export type CategoryDraft = {
  set isAvailable(isAvailable: boolean);
  set name(name: string);
}

export type CategoriesState = {
  isPopupOpen: boolean;
}

export interface CategoriesStore extends StoreEntityState<CategoriesState, CategorySchema, CategoryDraft> {}

export interface CategoriesStoreActions extends StoreCrud<CategorySchema> {
  setIsPopupOpen(isPopupOpen: boolean): void;
}

export interface CategoriesController extends CrudController<{}> {
  setIsPopupOpen(isPopupOpen: boolean): Promise<void>;
  delete(categoryId: number): Promise<boolean>;
}

/**
 * Product Variants
 */

export type ProductVariantUpdates = Partial<ProductVariantSchema>;

export type ProductVariantsFilter = Partial<{
  productId: number;
}>

export type ProductVariantDraft = {
  set sku(sku: string);
  set name(name: string);
  set price(price: number);
  set stock(stock: number | null);
  set stockPerTime(stockPerTime: number | null);
  set stockAlert(stockAlert: number | null);
}

export type ProductVariantsState = {}

export interface ProductVariantsStore
  extends StoreEntityState<ProductVariantsState, ProductVariantSchema, ProductVariantDraft> {}

export interface ProductVariantsStoreActions extends StoreCrud<ProductVariantSchema> {}

export interface ProductVariantsController {
  loadAll(productId: number): Promise<boolean>;
  save(product: ProductSchema): Promise<boolean>;
  delete(entityId: number): Promise<boolean>;
  select(entityId?: number): Promise<void>;
}

/**
 * Orders
 */

export interface OrdersStore extends StoreEntityState<{}, OrderSchema, {}> {}

export interface OrdersStoreActions extends StoreCrud<OrderSchema> {}

export interface OrdersController extends CrudController<{}> {}
