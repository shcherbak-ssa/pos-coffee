import { proxy } from 'valtio';

import type { UserSchema as BaseUserSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { getUpdates } from 'shared/helpers/get-updates';

import type {
  UsersState,
  UsersStore,
  UsersStoreWithActions,
  UsersViewState,
  UserUpdates,
} from '@admin/shared/types';
import { ListView } from '@admin/shared/constants';
import { createUserDraft, UserSchema } from '@admin/models/user';

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

  draftUser: createUserDraft(),

  hasSelectedUserUpdates(): boolean {
    const { id, createdAt, updatedAt, deletedAt, ...updates } = this.getSelectedUserUpdates();

    return !!Object.keys(updates).length;
  },

  getSelectedUserUpdates(): UserUpdates {
    const { selectedUser } = usersStore.state;
    const foundUser: BaseUserSchema | undefined = findUserById(selectedUser.id);

    if (foundUser) {
      return getUpdates(foundUser, selectedUser);
      // const updates: UserUpdates = { id: selectedUser.id };

      // for (const [ key, value ] of Object.entries(selectedUser)) {
      //   if (foundUser[key as keyof UserUpdates] !== value) {
      //     // @ts-ignore
      //     updates[key] = value;
      //   }
      // }

      // return updates;
    }

    return (selectedUser as UserSchema).getUpdates();
  },

  setCurrentUser(user: UserSchema): void {
    usersStore.state.currentUser = UserSchema.create(user);
  },

  setUsers(users: UserSchema[]): void {
    usersStore.state.users = users.map(UserSchema.create);
  },

  addUser(user: UserSchema): void {
    const foundUser: BaseUserSchema | undefined = findUserById(user.id);
    let updatedUsers: BaseUserSchema[] = usersStore.state.users.map(UserSchema.create);

    if (foundUser) {
      updatedUsers = usersStore.state.users.map((stateUser) => {
        return stateUser.id === user.id ? user : stateUser;
      });
    } else {
      updatedUsers.push(user);
    }

    this.setUsers(updatedUsers);
  },

  removeUser(userId: number): void {
    const updatedUsers: BaseUserSchema[] = usersStore.state.users.filter(({ id }) => id !== userId);
    this.setUsers(updatedUsers);

    updateSelectedUser({
      ...usersStore.state.selectedUser,
      isDeleted: !usersStore.state.selectedUser.isDeleted,
    });
  },

  selectUser(userId: number): void {
    const user: BaseUserSchema | undefined = userId === ZERO
      ? UserSchema.create()
      : findUserById(userId);

    if (user) {
      updateSelectedUser(user);
      return;
    }

    throw new AppError(`User with id ${userId} not found`);
  },

  updateViewState<T extends keyof UsersViewState>(state: T, value: UsersViewState[T]): void {
    usersStore.state.view[state] = value;
  },

};

function findUserById(userId: number): BaseUserSchema | undefined {
  return usersStore.state.users.find(({ id }) => id === userId);
}

function updateSelectedUser(user: BaseUserSchema): void {
  usersStore.state.selectedUser = UserSchema.create(user);
  usersStore.draftUser = createUserDraft(usersStore.state.selectedUser);
}
