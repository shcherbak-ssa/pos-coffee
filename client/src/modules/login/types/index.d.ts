export type Controllers = LoginController;

export type LoginSchema = {
  username: string;
  password: string;
}

export type LoginState = {
  login: LoginSchema;
}

export interface Login {
  get username(): string;
  set username(username: string);
  get password(): string;
  set password(password: string);
}

export interface LoginStore {
  get login(): Login;
  set login(login: Login);
}

export interface LoginController {
  processLogin(model: Login): Promise<void>;
}
