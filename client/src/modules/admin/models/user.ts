import type { AddressDraft, AddressSchema as BaseAddressSchema, UserSchema as BaseUserSchema } from 'shared/types';
import { EMPTY_STRING, UserType } from 'shared/constants';

import type { UsersFilter, UserDraft, UserUpdates } from '@admin/shared/types';
import { AddressSchema, createAddressDraft } from '@admin/models/address';
import { BaseSchema } from 'lib/base-schema';

export class UserSchema extends BaseSchema<UserUpdates> implements BaseUserSchema {
  public name: string;
  public surname: string;
  public email: string;
  public phone: string;
  public type: UserType;
  public image: string;
  public address: BaseAddressSchema | null;

  private constructor(schema?: BaseUserSchema) {
    super(schema);
    this.name = schema?.name || EMPTY_STRING;
    this.surname = schema?.surname || EMPTY_STRING;
    this.email = schema?.email || EMPTY_STRING;
    this.phone = schema?.phone || EMPTY_STRING;
    this.type = schema?.type || UserType.ADMIN;
    this.image = schema?.image || EMPTY_STRING;
    this.address = AddressSchema.create(schema?.address || undefined);
  }

  public static create(schema?: BaseUserSchema): UserSchema {
    return new UserSchema(schema);
  }

  public getUpdates(): UserUpdates {
    const { address, ...updates }: UserUpdates = super.getUpdates();

    return {
      ...updates,
      address: (address as AddressSchema).getUpdates(),
    };
  }
}

export function createDraft(schema: BaseUserSchema = UserSchema.create()): UserDraft {

  return {
    get address(): AddressDraft {
      return createAddressDraft(schema.address || undefined);
    },

    set name(name: string) {
      schema.name = name;
    },

    set surname(surname: string) {
      schema.surname = surname;
    },

    set email(email: string) {
      schema.email = email;
    },

    set image(phone: string) {
      schema.phone = phone;
    },

    set type(type: UserType) {
      schema.type = type;
    },
  };

}
