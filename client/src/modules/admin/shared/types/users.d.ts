import type { CurrentUserSchema, Store } from 'shared/types';

import type { ListAction, ListView } from '@admin/shared/constants';

export type UserSchema = CurrentUserSchema;

export type UsersState = {
  currentUser: UserSchema;
  users: UserSchema[];
  view: UsersViewState;
}

export type UsersViewState = {
  listView: ListView;
  listAction: ListAction[];
}

export interface UsersStore extends Store<UsersState> {}

export interface UsersStoreWithActions extends UsersStore {
  setCurrentUser(user: UserSchema): void;
  setUsers(users: UserSchema[]): void;
  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): void;
}

export interface UsersController {
  loadUsers(): Promise<boolean>;
  setCurrentUser(user: UserSchema): Promise<void>;
  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): Promise<void>;
}
