import type { UserSchema, Store, AddressDraft, AddressUpdates } from 'shared/types';
import type { UserType } from 'shared/constants';

export type UserUpdates = Partial<Omit<UserSchema, 'address'> & {
  address: AddressUpdates;
}>

export type UsersFilter = Partial<{
  onlyDeleted: boolean;
}>

export type UserDraft = {
  get fullname(): string;
  get address(): AddressDraft;
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
}

export interface UsersController {
  loadUsers(filter?: UsersFilter): Promise<boolean>;
  loadUser(userId: number): Promise<boolean>;
  saveUser(user: UserSchema): Promise<number | void>;
  deleteUser(userId: number): Promise<boolean>;
  restoreUser(userId: number): Promise<boolean>
  selectUser(userId?: number): Promise<void>;
  setCurrentUser(user: UserSchema): Promise<void>;
}
