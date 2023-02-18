import type { UserSchema, AddressDraft, AddressUpdates, StoreCrud, CrudController, StoreState } from 'shared/types';
import type { UserType } from 'shared/constants';

export type UserUpdates = Partial<Omit<UserSchema, 'address'> & {
  address: AddressUpdates;
}>

export type UsersFilter = Partial<{
  onlyArchived: boolean;
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

export interface UsersStore extends StoreState<UsersState> {
  draftUser: UserDraft;
}

export interface UsersStoreActions extends StoreCrud<UserSchema> {
  setCurrentUser(user: UserSchema): void;
}

export interface UsersController extends CrudController<UserSchema, UsersFilter> {
  selectUser(userId?: number): Promise<void>;
  setCurrentUser(user: UserSchema): Promise<void>;
}
