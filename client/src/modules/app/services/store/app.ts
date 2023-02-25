import { proxy } from 'valtio';

import type { AppState, AppStore, AppStoreActions, UserSchema as BaseUserSchema } from '@app/shared/types';
import { UserSchema } from '@app/models/user';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    loggedUser: UserSchema.create(),
  }),

  setLoggedUser(user: BaseUserSchema): void {
    appStore.state.loggedUser = UserSchema.create(user);
  },

};
