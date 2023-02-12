import type { Store } from 'shared/types';

export type Controllers = LoginController;

export type LoginSchema = {
  username: string;
  password: string;
}

export type LoginState = {
  login: LoginSchema;
}

export interface LoginStore extends Store<LoginState> {
  login: LoginSchema;
}

export interface LoginController {
  processLogin(schema: LoginSchema): Promise<void>;
}
