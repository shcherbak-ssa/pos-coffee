import type { CurrentUserSchema, Store } from 'shared/types';

export type UserSchema = CurrentUserSchema;

export type UsersState = {
  currentUser: UserSchema;
  users: UserSchema[];
}

export interface UsersStore extends Store<UsersState> {}

export interface UsersStoreWithActions extends UsersStore {
  setCurrentUser(user: UserSchema): void;
  setUsers(users: UserSchema[]): void;
}

export interface UsersController {
  setCurrentUser(user: UserSchema): Promise<void>;
  loadUsers(): Promise<boolean>;
}
