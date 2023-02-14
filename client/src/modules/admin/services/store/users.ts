import { proxy } from 'valtio';

import { AppError } from 'shared/errors';
import { cloneObject } from 'shared/utils';

import type { UsersState, UsersStore, UsersStoreWithActions, UsersViewState } from '@admin/shared/types';
import { ListView } from '@admin/shared/constants';
import { createUserDraftSchema, UserSchema } from '@admin/models/user';

export const usersStore: UsersStore & UsersStoreWithActions = {

  state: proxy<UsersState>({
    currentUser: UserSchema.create(),
    users: [],
    selectedUser: UserSchema.create(),

    view: {
      listView: ListView.LIST,
      listAction: [],
    },
  }),

  draftUser: createUserDraftSchema(),

  setCurrentUser(user: UserSchema): void {
    usersStore.state.currentUser =  UserSchema.create(user);
  },

  setUsers(users: UserSchema[]): void {
    usersStore.state.users = users.map(UserSchema.create);
  },

  addUser(user: UserSchema): void {
    const foundUser: UserSchema | undefined = findUserById(user.id);
    let updatedUsers: UserSchema[] = cloneObject(usersStore.state.users);

    if (foundUser) {
      updatedUsers = usersStore.state.users.map((stateUser) => {
        return stateUser.id === user.id ? user : stateUser;
      });
    } else {
      updatedUsers.push(user);
    }

    this.setUsers(updatedUsers);
  },

  selectUser(userId: number): void {
    const foundUser: UserSchema | undefined = findUserById(userId);

    if (foundUser) {
      usersStore.state.selectedUser = cloneObject(foundUser);
      usersStore.draftUser = createUserDraftSchema(usersStore.state.selectedUser);
    }

    throw new AppError(`User with id ${userId} not found`);
  },

  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): void {
    usersStore.state.view[state] = value;
  },

};

function findUserById(userId: number): UserSchema | undefined {
  return usersStore.state.users.find(({ id }) => id === userId);
}
