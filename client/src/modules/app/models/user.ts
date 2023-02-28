import type { UserType } from 'shared/constants';

import type { UserSchema as BaseUserSchema } from '@app/shared/types';

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public image: string;
  public type: UserType;

  private constructor(schema: BaseUserSchema) {
    this.id = schema.id;
    this.name = schema.name;
    this.surname = schema.surname;
    this.image = schema.image;
    this.type = schema.type;
  }

  public static create(schema: BaseUserSchema): UserSchema {
    return new UserSchema(schema);
  }
}
