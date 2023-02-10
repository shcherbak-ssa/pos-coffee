export type Controllers = LoginController;

export type LoginSchema = {
  username: string;
  password: string;
}

export interface Login {
  get username(): string;
  set username(username: string);
  get password(): string;
  set password(password: string);
  get schema(): LoginSchema;
}

export interface LoginController {
  login(schema: LoginSchema): Promise<void>;
}
