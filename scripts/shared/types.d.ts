import type { UserType } from './constants';

export type Config = {
  users: User[];
  categories: Category[];
  products: Product[];
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
  isArchived: boolean;
}

export type Category = {
  name: string;
  isArchived: boolean;
}
