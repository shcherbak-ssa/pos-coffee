import { proxy } from 'valtio';

import type { UsersState, UsersStore, UsersStoreWithActions } from 'modules/admin/shared/types';
import { UserSchema } from 'modules/admin/models/user';

export const usersStore: UsersStore & UsersStoreWithActions = {

  state: proxy<UsersState>({
    currentUser: UserSchema.create(),
  }),

  setCurrentUser(user): void {
    usersStore.state.currentUser = user;
  },

};
