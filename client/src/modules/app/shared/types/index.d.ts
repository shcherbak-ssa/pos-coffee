import type {
  UserSchema as BaseUserSchema,
  StoreState,
  CategorySchema,
  ProductSchema,
  ProductVariantSchema,
  MessageType,
} from 'shared/types';
import type { PaymentMethodType } from 'shared/constants';

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
  users: AppUsersState;
}

export type AppUsersState = {
  manager: UserSchema | null;
  cashier: UserSchema | null;
  loggedUsers: UserSchema[];
}

export interface AppStore extends StoreState<AppState> {
  usersList: UserSchema[];
}

export interface AppStoreActions extends AppStore {
  setManager(user: UserSchema): void;
  setCashier(user: UserSchema | null): void;
  addLoggedUser(user: UserSchema): void;
  removeLoggedUser(user: UserSchema): void;
  setUsers(users: UserSchema[]): void;
}

export interface AppController {
  setManager(user: UserSchema): Promise<void>;
  setCashier(user: UserSchema | null): Promise<void>;
  addLoggedUser(user: UserSchema): Promise<void>;
  removeLoggedUser(user: UserSchema): Promise<void>;
  loadUsers(): Promise<void>;
}

/**
 * Users
 */

export type UserSchema = Pick<
  BaseUserSchema,
  'id' | 'name' | 'surname' | 'image' | 'type'
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
  paymentMethod: PaymentMethodType;
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
