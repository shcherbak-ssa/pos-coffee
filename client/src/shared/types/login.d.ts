export type Token = {
  token: string;
  type: string;
}

export type LoginSchema = {
  username: string;
  password: string;
}

export interface LoginController {
  login(schema: LoginSchema): Promise<void>;
}
