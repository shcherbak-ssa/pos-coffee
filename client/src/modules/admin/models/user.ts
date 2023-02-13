import type { UserSchema as BaseUserSchema } from 'modules/admin/shared/types';
import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public username: string;
  public type: UserType;

  private constructor() {
    this.id = ZERO;
    this.name = EMPTY_STRING;
    this.surname = EMPTY_STRING;
    this.email = EMPTY_STRING;
    this.username = EMPTY_STRING;
    this.type = UserType.ADMIN;
  }

  public static create(): UserSchema {
    return new UserSchema();
  }

}
