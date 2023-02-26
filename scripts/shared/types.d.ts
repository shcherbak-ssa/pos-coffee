import type { UserType } from './constants';

export type Config = {
  users: User[];
  categories: Category[];
  products: Product[];
  productVariants: ProductVariant[];
  orders: Order[];
  orderLines: OrderLine[];
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
  useStockForVariants: boolean;
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
  stock: number
  stockPerTime: number;
  stockAlert: number;
  useProductPrice: boolean;
  product: number;
}

export type Order = {
  lines: number[];
  user: number,
}

export type OrderLine = {
  count: number;
  product: number;
  variant: number;
}
