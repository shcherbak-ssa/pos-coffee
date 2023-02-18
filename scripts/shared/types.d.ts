import type { UserType } from './constants';

export type Config = {
  users: User[];
  products: Product[];
}

export type User = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  type: UserType;
  photo: string;
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
  photo: string;
  isArchived: boolean;
}
