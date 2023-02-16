import type { AddressDraft, AddressSchema as BaseAddressSchema, AddressUpdates } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

export class AddressSchema implements BaseAddressSchema {
  public id: number;
  public country: string;
  public state: string;
  public city: string;
  public zipCode: string;
  public address: string;
  public createdAt: Date | null;
  public updatedAt: Date | null;

  private constructor(address?: BaseAddressSchema) {
    this.id = address?.id || ZERO;
    this.country = address?.country || EMPTY_STRING;
    this.state = address?.state || EMPTY_STRING;
    this.city = address?.city || EMPTY_STRING;
    this.zipCode = address?.zipCode || EMPTY_STRING;
    this.address = address?.address || EMPTY_STRING;
    this.createdAt = address?.createdAt ? new Date(address.createdAt) : null;
    this.updatedAt = address?.updatedAt ? new Date(address.updatedAt) : null;
  }

  public static create(address?: BaseAddressSchema): AddressSchema {
    return new AddressSchema(address);
  }

  public getUpdates(): AddressUpdates {
    const { id, createdAt, updatedAt, ...updates } = this;

    return updates;
  }
}

export function createAddressDraft(schema: BaseAddressSchema = AddressSchema.create()): AddressDraft {

  return {
    set country(country: string) {
      schema.country = country;
    },

    set state(state: string) {
      schema.state = state;
    },

    set city(city: string) {
      schema.city = city;
    },

    set zipCode(zipCode: string) {
      schema.zipCode = zipCode;
    },

    set address(address: string) {
      schema.address = address;
    },
  };

}
