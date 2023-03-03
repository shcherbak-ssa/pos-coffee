import { proxy } from 'valtio';

import type { OrderSchema as BaseOrderSchema, SettingsSchema as BaseSettingsSchema } from 'shared/types';

import type { AppState, AppStore, AppStoreActions, UserSchema as BaseUserSchema } from '@app/shared/types';
import { UserSchema } from '@app/models/user';
import { OrderSchema } from 'lib/order-models';
import { SettingsSchema } from 'lib/settings-model';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    settings: SettingsSchema.create(),
    users: {
      manager: null,
      cashier: null,
      loggedUsers: [],
    },
  }),

  usersList: [],
  orders: [],

  setUsers(users: BaseUserSchema[]): void {
    appStore.usersList = users.map(UserSchema.create);
  },

  setOrders(orders: BaseOrderSchema[]): void {
    appStore.orders = orders.map(OrderSchema.create);
  },

  setSettings(settings: BaseSettingsSchema): void {
    appStore.state.settings = SettingsSchema.create(settings);
  },

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


};
