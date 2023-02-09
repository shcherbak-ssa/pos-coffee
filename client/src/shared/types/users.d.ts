import type { UserType } from 'shared/constants';

export type UserSchema = {
  id: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  type: UserType;
}

export interface User {
  get id(): number;
  get fullName(): string;
  get email(): string;
  get username(): string;
  get type(): UserType;
  set name(name: string);
  set surname(name: string);
  set email(email: string);
  set username(username: string);
  set type(type: UserType);
  get hasUpdates(): boolean;
}

export interface UsersController {
  getUser(): Promise<UserSchema>;
}
