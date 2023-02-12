import { proxy } from 'valtio';

import type { Store, User as BaseUser, UsersState, UserStore as BaseUsersStore } from 'shared/types';
import { User, UserSchema } from 'models/user';

export class UsersStore implements Store<UsersState>, BaseUsersStore {

  public readonly state: UsersState;
  public user: BaseUser;

  private constructor() {
    this.state = proxy<UsersState>({
      user: UserSchema.create(),
    });

    this.user = User.create(this.state.user);
  }

  public static create(): UsersStore {
    return new UsersStore();
  }

}
