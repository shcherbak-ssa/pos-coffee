import type {
  UserSchema as BaseUserSchema,
  StoreState,
  CategorySchema,
  ProductSchema,
  ProductVariantSchema,
  OrderLineSchema,
  MessageType,
} from 'shared/types';

/**
 * Helpers
 */

export type ProductId = number;
export type VariantId = number;

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

export type CartPayload = {
  product: CartProductSchema;
  variant?: ProductVariantSchema;
}

export type CartProductSchema = ProductSchema & {
  variants: ProductVariantSchema[];
}

export type CartOrderLineSchema = {
  count: number;
  price: number;
  product: CartProductSchema;
  variant?: ProductVariantSchema;
}

export type CartOrderSchema = {
  userId: number;
  lines: CartOrderLineSchema[];
}

export type CartStockAlertMessage = {
  type: MessageType;
  message: string;
}

export interface CartStockAlert {
  remainStock(payload: CartPayload): number;
}

export interface CartService extends CartStockAlert {
  findLine(line: CartOrderLineSchema): CartOrderLineSchema | undefined;
  isSameOrderLine(line: CartOrderLineSchema, lineToCompare: CartOrderLineSchema): boolean;
  checkStock(line: CartOrderLineSchema, count: number): void;
  parseStock(product: CartProductSchema): void;
}

export type CartState = {
  order: CartOrderSchema;
  activeCategoryId: number;
}

export interface CartStore extends StoreState<CartState> {
  categories: CategorySchema[];
  products: CartProductSchema[];
  getStockAlert: () => CartStockAlert;
}

export interface CartStoreActions extends CartStore {
  createOrder(): void;
  addOrderLine(line: CartOrderLineSchema): void;
  removeOrderLine(line: CartOrderLineSchema): void;
  removeAllOrderLines(): void;
  updateOrderLineCount(line: CartOrderLineSchema, count: number): void;
  setActiveCategoryId(categoryId: number): void;
  setCategories(categories: CategorySchema[]): void;
  setProducts(products: CartProductSchema[]): void;
}

export interface CartController {
  createOrder(): Promise<void>;
  addOrderLine(payload: CartPayload): Promise<void>;
  removeOrderLine(line: CartOrderLineSchema): Promise<void>;
  removeAllOrderLines(): Promise<void>;
  updateOrderLineCount(line: CartOrderLineSchema, count: number): Promise<void>;
  setActiveCategoryId(categoryId?: number): Promise<void>;
  loadCategories(): Promise<boolean>;
  loadProducts(): Promise<boolean>;
}
