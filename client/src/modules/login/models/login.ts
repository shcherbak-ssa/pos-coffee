import { EMPTY_STRING } from 'shared/constants';

import type { LoginSchema as BaseLoginSchema } from 'modules/login/shared/types';

export class LoginSchema implements BaseLoginSchema {
  public username: string;
  public password: string;

  private constructor() {
    this.username = EMPTY_STRING;
    this.password = EMPTY_STRING;
  }

  public static create(): LoginSchema {
    return new LoginSchema();
  }
}
