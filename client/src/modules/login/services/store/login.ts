import { proxy } from 'valtio';

import type { LoginState, LoginStore as BaseLoginStore } from 'modules/login/shared/types';
import { LoginSchema } from 'modules/login/models/login';

export const loginStore: BaseLoginStore = {

  state: proxy<LoginState>({
    login: LoginSchema.create(),
  }),

  login: {
    get username(): string {
      return loginStore.state.login.username;
    },

    set username(username: string) {
      loginStore.state.login.username = username;
    },

    get password(): string {
      return loginStore.state.login.password;
    },

    set password(password: string) {
      loginStore.state.login.password = password;
    },
  },

};
