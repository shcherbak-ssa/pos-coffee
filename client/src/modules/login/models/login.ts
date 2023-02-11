import { EMPTY_STRING } from 'shared/constants';

import type { LoginSchema as BaseLoginSchema, Login as BaseLogin } from 'modules/login/shared/types';

class LoginSchema implements BaseLoginSchema {
  public username: string;
  public password: string;

  public constructor(schema?: BaseLoginSchema) {
    this.username = schema?.username || EMPTY_STRING;
    this.password = schema?.password || EMPTY_STRING;
  }
}

export class Login implements BaseLogin {

  private constructor(
    private _schema: BaseLoginSchema,
  ) {}

  public static create(schema?: BaseLoginSchema): Login {
    return new Login(new LoginSchema(schema));
  }

  public get username(): string {
    return this._schema.username;
  }

  public set username(username: string) {
    this._schema.username = username;
  }

  public get password(): string {
    return this._schema.password;
  }

  public set password(password: string) {
    this._schema.password = password;
  }

  public get schema(): BaseLoginSchema {
    return this._schema;
  }

}
