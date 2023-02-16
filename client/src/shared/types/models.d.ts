import type { UserType } from 'shared/constants';

export type UserSchema = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  type: UserType;
  photo: string;
  address: AddressSchema | null;
  isDeleted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type AddressSchema = {
  id: number;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type AddressUpdates = Partial<AddressSchema>;

export type AddressDraft = {
  set country(country: string);
  set state(state: string);
  set city(city: string);
  set zipCode(zipCode: string);
  set address(address: string);
}
