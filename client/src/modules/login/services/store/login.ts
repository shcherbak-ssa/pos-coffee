import { proxy } from 'valtio';

import type { LoginState, LoginStore } from '@login/shared/types';
import { LoginSchema } from '@login/models/login';

export const loginStore: LoginStore = {

  state: proxy<LoginState>({
    login: LoginSchema.create(),
  }),

  login: {
    set email(email: string) {
      loginStore.state.login.email = email;
    },

    set password(password: string) {
      loginStore.state.login.password = password;
    },
  },

};
