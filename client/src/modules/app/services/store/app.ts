import { proxy } from 'valtio';

import type { AppState, AppStore, AppStoreActions, UserSchema as BaseUserSchema } from '@app/shared/types';
import { UserSchema } from '@app/models/user';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    users: {
      manager: null,
      cashier: null,
      loggedUsers: [],
    },
  }),

  usersList: [],

  setManager(user: BaseUserSchema): void {
    appStore.state.users.manager = UserSchema.create(user);
    this.addLoggedUser(user);
  },

  setCashier(user: BaseUserSchema | null): void {
    appStore.state.users.cashier = user ? UserSchema.create(user) : null;
  },

  addLoggedUser(user: BaseUserSchema): void {
    appStore.state.users.loggedUsers.push(UserSchema.create(user));
  },

  removeLoggedUser(user: BaseUserSchema): void {
    appStore.state.users.loggedUsers = appStore.state.users.loggedUsers.filter(({ id }) => id !== user.id);
  },

  setUsers(users: BaseUserSchema[]): void {
    appStore.usersList = users.map(UserSchema.create);
  },

};
