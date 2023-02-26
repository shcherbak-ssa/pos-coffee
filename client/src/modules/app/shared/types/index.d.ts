import type {
  UserSchema as BaseUserSchema,
  StoreState,
  CategorySchema,
  ProductSchema,
  ProductVariantSchema,
  OrderLineSchema,
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

export type CartProductSchema = ProductSchema & {
  variants: ProductVariantSchema[];
}

export type CartOrderSchema = {
  userId: number;
  lines: OrderLineSchema[];
}

export type CartState = {
  currentOrder: CartOrderSchema;
  activeCategoryId: number;
  categories: CategorySchema[];
  products: CartProductSchema[];
}

export interface CartStore extends StoreState<CartState> {}

export interface CartStoreActions extends CartStore {
  createOrder(): void;
  addOrderLine(line: OrderLineSchema): void;
  removeOrderLine(line: OrderLineSchema): void;
  removeAllOrderLines(): void;
  updateOrderLineCount(line: OrderLineSchema, count: number): void;
  setActiveCategoryId(categoryId: number): void;
  setCategories(categories: CategorySchema[]): void;
  setProducts(products: CartProductSchema[]): void;
}

export interface CartController {
  createOrder(): Promise<void>;
  addOrderLine(product: CartProductSchema, variant?: ProductVariantSchema): Promise<void>;
  removeOrderLine(line: OrderLineSchema): Promise<void>;
  removeAllOrderLines(): Promise<void>;
  updateOrderLineCount(line: OrderLineSchema, count: number): Promise<void>;
  setActiveCategoryId(categoryId?: number): Promise<void>;
  loadCategories(): Promise<boolean>;
  loadProducts(): Promise<boolean>;
}
