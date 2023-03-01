import type {
  UserSchema as BaseUserSchema,
  StoreState,
  CategorySchema,
  ProductSchema,
  ProductVariantSchema,
  OrderSchema,
  OrderLineSchema,
  OrderUserSchema,
  SettingsSchema,
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

export type AppHomeData = {
  users: UserSchema[];
  orders: OrderSchema[];
}

export type AppMenu = {
  categories: CategorySchema[];
  products: CartProductSchema[];
}

/**
 * App
 */

export type AppState = {
  settings: SettingsSchema;
  users: AppUsersState;
}

export type AppUsersState = {
  manager: UserSchema | null;
  cashier: UserSchema | null;
  loggedUsers: UserSchema[];
}

export interface AppStore extends StoreState<AppState> {
  usersList: UserSchema[];
  orders: OrderSchema[];
}

export interface AppStoreActions extends AppStore {
  setSettings(settings: SettingsSchema): void;
  setUsers(users: UserSchema[]): void;
  setOrders(orders: OrderSchema[]): void;
  setManager(user: UserSchema): void;
  setCashier(user: UserSchema | null): void;
  addLoggedUser(user: UserSchema): void;
  removeLoggedUser(user: UserSchema): void;
}

export interface AppController {
  loadSettings(): Promise<void>;
  loadData(): Promise<void>;
  setManager(user: UserSchema): Promise<void>;
  setCashier(user: UserSchema | null): Promise<void>;
  addLoggedUser(user: UserSchema): Promise<void>;
  removeLoggedUser(user: UserSchema): Promise<void>;
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
  user: { id: number };
  lines: CartOrderLineSchema[];
  paymentMethod: PaymentMethodType;
}

export type CartOrderUpdates = Partial<
  Omit<OrderSchema, 'user' | 'lines'> & {
    user: Partial<OrderUserSchema>,
    lines: Partial<OrderLineSchema>[],
  }
>

export interface CartStockAlert {
  remainStock(payload: CartPayload): number;
}

export interface CartService extends CartStockAlert {
  findLine(line: CartOrderLineSchema): CartOrderLineSchema | undefined;
  isSameOrderLine(line: CartOrderLineSchema, lineToCompare: CartOrderLineSchema): boolean;
  checkStock(line: CartOrderLineSchema, count: number): void;
  parseOrder(order: CartOrderSchema, user: UserSchema, taxes: number): CartOrderUpdates;
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
  resetOrder(): void;
  addOrderLine(line: CartOrderLineSchema): void;
  removeOrderLine(line: CartOrderLineSchema): void;
  removeAllOrderLines(): void;
  updateOrderLineCount(line: CartOrderLineSchema, count: number): void;
  setOrderPaymentMethod(type: PaymentMethodType): void;
  setActiveCategoryId(categoryId: number): void;
  setCategories(categories: CategorySchema[]): void;
  setProducts(products: CartProductSchema[]): void;
}

export interface CartController {
  createOrder(): Promise<boolean>;
  addOrderLine(payload: CartPayload): Promise<void>;
  removeOrderLine(line: CartOrderLineSchema): Promise<void>;
  removeAllOrderLines(): Promise<void>;
  updateOrderLineCount(line: CartOrderLineSchema, count: number): Promise<void>;
  setOrderPaymentMethod(type: PaymentMethodType): Promise<void>;
  setActiveCategoryId(categoryId?: number): Promise<void>;
  loadMenu(): Promise<void>;
}
