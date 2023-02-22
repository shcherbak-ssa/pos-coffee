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
  | ProductsController
  | CategoriesController
  | ProductVariantsController;

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
  to?: PagePath;
  command?: EmptyFunction;
}

export type AppComponentProps = {
  appStore: AppStore;
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

export type CardWithInputsProps<T, D> = {
  entity: T;
  entityDraft: D;
  isEditMode: boolean;
  validationError: ErrorObject<T> | undefined;
  className?: string;
}

/**
 * App
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

export type AppState = {
  productCategories: ProductCategory[];
  currentPage: AppPageSchema;
  currentUser: UserSchema;
  isAppMenuOpen: boolean;
  view: AppViewState;
}

export interface AppStore extends StoreState<AppState> {}

export interface AppStoreActions extends AppStore {
  setProductCategories(productCategories: ProductCategory[]): void;
  setCurrentPage(page: AppPageSchema): void;
  setCurrentUser(user: UserSchema): void;
  setIsAppMenuOpen(isOpen: boolean): void;
  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void;
}

export interface AppController {
  loadProductCategories(): Promise<void>;
  setCurrentPage(page: AppPageSchema): Promise<void>;
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
  set image(image: string);
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
  set stock(stock: number);
  set useStockForVariants(useStockForVariants: boolean);
  set image(image: string);
  set category(category: ProductCategory);
  set isAvailable(isAvailable: boolean);
}

export type ProductsState = {}

export interface ProductsStore extends StoreEntityState<ProductsState, ProductSchema, ProductDraft> {}

export interface ProductsStoreActions extends StoreCrud<ProductSchema> {}

export interface ProductsController extends CrudController<ProductSchema, ProductsFilter> {}

/**
 * Categories
 */

export type CategoryUpdates = Partial<CategorySchema>;

export type CategoriesFilter = Partial<{
  onlyArchived: boolean;
}>

export type CategoryDraft = {
  set isAvailable(isAvailable: boolean);
  set name(name: string);
}

export type CategoriesState = {}

export interface CategoriesStore extends StoreEntityState<CategoriesState, CategorySchema, CategoryDraft> {}

export interface CategoriesStoreActions extends StoreCrud<CategorySchema> {}

export interface CategoriesController extends CrudController<CategorySchema, CategoriesFilter> {}

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
  set stock(stock: number);
  set stockPerTime(stockPerTime: number);
  set useProductPrice(useProductPrice: boolean);
}

export type ProductVariantsState = {}

export interface ProductVariantsStore
  extends StoreEntityState<ProductVariantsState, ProductVariantSchema, ProductVariantDraft> {}

export interface ProductVariantsStoreActions extends StoreCrud<ProductVariantSchema> {}

export interface ProductVariantsController {
  loadAll(productId: number): Promise<boolean>;
  save(productId: number, variant: ProductVariantSchema): Promise<number | undefined>;
  delete(entityId: number): Promise<boolean>;
  select(entityId?: number): Promise<void>;
}
