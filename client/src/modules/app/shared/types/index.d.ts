import type {
  UserSchema as BaseUserSchema,
  StoreState,
  CategorySchema,
  ProductSchema,
  ProductVariantSchema,
} from 'shared/types';

/**
 * Helpers
 */

export type Controllers =
  | AppController
  | MenuController;

/**
 * App
 */

export type AppState = {
  loggedUser: UserSchema;
}

export interface AppStore extends StoreState<AppState> {}

export interface AppStoreActions extends AppStore {
  setLoggedUser(user: UserSchema): void;
}

export interface AppController {
  setLoggedUser(user: UserSchema): Promise<void>;
}

/**
 * User
 */

export type UserSchema = Pick<
  BaseUserSchema,
  'id' | 'name' | 'surname' | 'image'
>;

/**
 * Menu
 */

export type MenuProduct = ProductSchema & {
  variants: ProductVariantSchema[];
}

export type MenuState = {
  activeCategoryId: number;
  categories: CategorySchema[];
  products: MenuProduct[];
}

export interface MenuStore extends StoreState<MenuState> {}

export interface MenuStoreActions extends MenuStore {
  setActiveCategoryId(categoryId: number): void;
  setCategories(categories: CategorySchema[]): void;
  setProducts(products: MenuProduct[]): void;
}

export interface MenuController {
  setActiveCategoryId(categoryId?: number): Promise<void>;
  loadCategories(): Promise<boolean>;
  loadProducts(): Promise<boolean>;
}
