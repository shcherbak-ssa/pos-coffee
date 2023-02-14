import { proxy } from 'valtio';

import type { UsersState, UsersStore, UsersStoreWithActions } from '@admin/shared/types';
import { UserSchema } from '@admin/models/user';

export const usersStore: UsersStore & UsersStoreWithActions = {

  state: proxy<UsersState>({
    currentUser: UserSchema.create(),
    users: [],
  }),

  setCurrentUser(user: UserSchema): void {
    usersStore.state.currentUser =  UserSchema.create(user);
  },

  setUsers(users: UserSchema[]): void {
    usersStore.state.users = users.map(UserSchema.create);
  },

};
