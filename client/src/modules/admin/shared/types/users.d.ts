import type { CurrentUserSchema, Store } from 'shared/types';

export type UserSchema = CurrentUserSchema;

export type UsersState = {
  currentUser: UserSchema;
}

export interface UsersStore extends Store<UsersState> {}

export interface UsersStoreWithActions extends UsersStore {
  setCurrentUser(user: UserSchema): void;
}

export interface UsersController {
  setCurrentUser(user: UserSchema): Promise<void>;
}
