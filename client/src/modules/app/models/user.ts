import { EMPTY_STRING, ZERO } from 'shared/constants';

import type { UserSchema as BaseUserSchema } from '@app/shared/types';

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public image: string;

  private constructor(schema?: BaseUserSchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.surname = schema?.surname || EMPTY_STRING;
    this.image = schema?.image || EMPTY_STRING;
  }

  public static create(schema?: BaseUserSchema): UserSchema {
    return new UserSchema(schema);
  }
}
