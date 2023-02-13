import { EMPTY_STRING } from 'shared/constants';

import type { LoginSchema as BaseLoginSchema } from 'modules/login/shared/types';

export class LoginSchema implements BaseLoginSchema {
  public email: string;
  public password: string;

  private constructor() {
    this.email = EMPTY_STRING;
    this.password = EMPTY_STRING;
  }

  public static create(): LoginSchema {
    return new LoginSchema();
  }
}
