import type { CurrentUserSchema, Store } from 'shared/types';
import type { UserType } from 'shared/constants';

import type { ListAction, ListView } from '@admin/shared/constants';

export type UserSchema = CurrentUserSchema;

export type UserUpdates = Partial<UserSchema>;

export type UsersFilter = Partial<{
  onlyDeleted: boolean;
}>;

export type UserDraft = {
  get fullname(): string;
  set name(name: string);
  set surname(surname: string);
  set email(email: string);
  set phone(phone: string);
  set type(type: UserType);
}

export type UsersState = {
  currentUser: UserSchema;
  users: UserSchema[];
  selectedUser: UserSchema;
  view: UsersViewState;
}

export type UsersViewState = {
  listView: ListView;
  listAction: ListAction[];
}

export interface UsersStore extends Store<UsersState> {
  draftUser: UserDraft;
}

export interface UsersStoreWithActions extends UsersStore {
  hasSelectedUserUpdates(): boolean;
  getSelectedUserUpdates(): UserUpdates;
  setCurrentUser(user: UserSchema): void;
  setUsers(users: UserSchema[]): void;
  addUser(user: UserSchema): void;
  removeUser(userId: number): void;
  selectUser(userId: number): void;
  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): void;
}

export interface UsersController {
  loadUsers(filter?: UsersFilter): Promise<boolean>;
  loadUser(userId: number): Promise<boolean>;
  saveUser(user: UserSchema): Promise<boolean>;
  deleteUser(userId: number): Promise<boolean>;
  restoreUser(userId: number): Promise<boolean>
  selectUser(userId?: number): Promise<void>;
  setCurrentUser(user: UserSchema): Promise<void>;
  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): Promise<void>;
}
