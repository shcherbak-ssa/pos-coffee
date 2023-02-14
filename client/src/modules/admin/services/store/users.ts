import { proxy } from 'valtio';

import type { UsersState, UsersStore, UsersStoreWithActions, UsersViewState } from '@admin/shared/types';
import { ListAction, ListView } from '@admin/shared/constants';
import { UserSchema } from '@admin/models/user';

export const usersStore: UsersStore & UsersStoreWithActions = {

  state: proxy<UsersState>({
    currentUser: UserSchema.create(),
    users: [],

    view: {
      listView: ListView.LIST,
      listAction: [],
    },
  }),

  setCurrentUser(user: UserSchema): void {
    usersStore.state.currentUser =  UserSchema.create(user);
  },

  setUsers(users: UserSchema[]): void {
    usersStore.state.users = users.map(UserSchema.create);
  },

  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): void {
    usersStore.state.view[state] = value;
  },

};
