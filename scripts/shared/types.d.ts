import type { Currency, PaymentMethod, UserType } from './constants';

export type Config = {
  settings: Settings;
  users: User[];
  categories: Category[];
  products: Product[];
  productVariants: ProductVariant[];
  orders: Order[];
  orderLines: OrderLine[];
}

export type Settings = {
  currency: Currency,
  taxes: number;
}

export type User = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  type: UserType;
  image: string;
  address: Address;
  isArchived: boolean;
}

export type Address = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
}

export type Product = {
  sku: string;
  name: string;
  price: number;
  image: string;
  category: number;
  stock: number;
  stockPerTime: number;
  stockAlert: number;
  isAvailable: boolean;
  isArchived: boolean;
}

export type Category = {
  name: string;
  isAvailable: boolean;
}

export type ProductVariant = {
  sku: string;
  name: string;
  price: number;
  stock: number | null
  stockPerTime: number | null;
  stockAlert: number | null;
  product: number;
}

export type Order = {
  user: number,
  lines: number[];
  taxes: number;
  paymentMethod: PaymentMethod;
  createdAt: number;
}

export type OrderLine = {
  count: number;
  product: number;
  variant: number | null;
}
