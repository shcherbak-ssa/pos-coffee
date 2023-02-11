import type { Login as BaseLogin, LoginState, LoginStore as BaseLoginStore } from 'modules/login/types';
import { Login } from 'modules/login/models/login';

import type { Store } from 'shared/types';

export class LoginStore implements Store, BaseLoginStore {

  private state: Partial<LoginState> = {};

  public static create(): LoginStore {
    return new LoginStore();
  }

  public get login(): BaseLogin {
    return Login.create(this.state.login);
  }

  public set login(login: BaseLogin) {
    const { username, password } = login;

    this.state.login = { username, password };
  }

}
