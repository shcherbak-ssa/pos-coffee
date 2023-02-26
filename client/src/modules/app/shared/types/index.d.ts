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
  | CartController;

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
 * Users
 */

export type UserSchema = Pick<
  BaseUserSchema,
  'id' | 'name' | 'surname' | 'image'
>;

/**
 * Cart
 */

export type CartProduct = ProductSchema & {
  variants: ProductVariantSchema[];
}

export type CartState = {
  activeCategoryId: number;
  categories: CategorySchema[];
  products: CartProduct[];
}

export interface CartStore extends StoreState<CartState> {}

export interface CartStoreActions extends CartStore {
  setActiveCategoryId(categoryId: number): void;
  setCategories(categories: CategorySchema[]): void;
  setProducts(products: CartProduct[]): void;
}

export interface CartController {
  setActiveCategoryId(categoryId?: number): Promise<void>;
  loadCategories(): Promise<boolean>;
  loadProducts(): Promise<boolean>;
}
