import type { UserSchema as BaseUserSchema } from 'modules/admin/shared/types';
import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public username: string;
  public phone: string;
  public type: UserType;

  private constructor(schema?: BaseUserSchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.surname = schema?.surname || EMPTY_STRING;
    this.email = schema?.email || EMPTY_STRING;
    this.phone = schema?.phone || EMPTY_STRING;
    this.username = schema?.username || EMPTY_STRING;
    this.type = schema?.type || UserType.ADMIN;
  }

  public static create(schema?: BaseUserSchema): UserSchema {
    return new UserSchema(schema);
  }

}
