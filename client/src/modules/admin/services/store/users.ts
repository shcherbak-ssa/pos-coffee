import { proxy } from 'valtio';

import type { UserSchema as BaseUserSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { filterById, findById } from 'shared/utils';
import { getUpdates } from 'shared/helpers/get-updates';

import type { UsersState, UsersStore, UsersStoreActions, UserUpdates } from '@admin/shared/types';
import { createUserDraft, UserSchema } from '@admin/models/user';

export const usersStore: UsersStore & UsersStoreActions = {

  state: proxy<UsersState>({
    users: [],
    currentUser: UserSchema.create(),
    selectedUser: UserSchema.create(),
  }),

  draftUser: createUserDraft(),

  setCurrentUser(user: UserSchema): void {
    usersStore.state.currentUser = UserSchema.create(user);
  },

  /**
   * CrudStore implementation
   */

  add(users: BaseUserSchema[]): void {
    usersStore.state.users = users.map(UserSchema.create);
  },

  save(user: BaseUserSchema): void {
    const foundUser: BaseUserSchema | undefined = findById(usersStore.state.users, user.id);
    let updatedUsers: BaseUserSchema[] = usersStore.state.users.map(UserSchema.create);

    if (foundUser) {
      updatedUsers = usersStore.state.users.map((stateUser) => {
        return stateUser.id === user.id ? user : stateUser;
      });
    } else {
      updatedUsers.push(user);
    }

    this.add(updatedUsers);
  },

  remove(userId: number): void {
    const updatedUsers: BaseUserSchema[] = filterById(usersStore.state.users, userId);
    this.add(updatedUsers);

    updateSelectedUser({
      ...usersStore.state.selectedUser,
      isArchived: !usersStore.state.selectedUser.isArchived,
    });
  },

  selected: {

    set(userId: number): void {
      const user: BaseUserSchema | undefined = userId === ZERO
        ? UserSchema.create()
        : findById(usersStore.state.users, userId);

      if (user) {
        updateSelectedUser(user);
        return;
      }

      throw new AppError(`User with id ${userId} not found`);
    },

    hadUpdates(): boolean {
      const { id, createdAt, updatedAt, archivedAt: deletedAt, address, ...updates } = this.getUpdates();
      const { id: addressId, ...addressUpdates } = address || {};

      return !!Object.keys(updates).length || !!Object.keys(addressUpdates).length;
    },

    // @ts-ignore
    getUpdates(): UserUpdates {
      const { selectedUser } = usersStore.state;
      const foundUser: BaseUserSchema | undefined = findById(usersStore.state.users, selectedUser.id);

      if (foundUser) {
        return getUpdates(foundUser, selectedUser);
      }

      return (selectedUser as UserSchema).getUpdates();
    },

  },

};

function updateSelectedUser(user: BaseUserSchema): void {
  usersStore.state.selectedUser = UserSchema.create(user);
  usersStore.draftUser = createUserDraft(usersStore.state.selectedUser);
}
