import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';

import type {
  UserSchema as BaseUserSchema,
  UserDraftSchema as BaseUserDraftSchema,
} from '@admin/shared/types';

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public phone: string;
  public type: UserType;

  private constructor(schema?: BaseUserSchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.surname = schema?.surname || EMPTY_STRING;
    this.email = schema?.email || EMPTY_STRING;
    this.phone = schema?.phone || EMPTY_STRING;
    this.type = schema?.type || UserType.ADMIN;
  }

  public static create(schema?: BaseUserSchema): UserSchema {
    return new UserSchema(schema);
  }
}

export function createUserDraftSchema(schema: BaseUserSchema = UserSchema.create()): BaseUserDraftSchema {

  return {
    get fullname(): string {
      return `${schema.name} ${schema.surname}`;
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

    set phone(phone: string) {
      schema.phone = phone;
    },

    set type(type: UserType) {
      schema.type = type;
    },
  };

}
