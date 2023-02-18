import { proxy } from 'valtio';

import type { UserSchema as BaseUserSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { findById } from 'shared/utils/by-id';
import { StoreService } from 'services/store';

import type { UsersStore, UsersStoreActions, UserUpdates } from '@admin/shared/types';
import { createDraft, UserSchema } from '@admin/models/user';

export const usersStore: UsersStore & UsersStoreActions = {

  state: proxy({
    list: [],
    selected: UserSchema.create(),
    currentUser: UserSchema.create(),
  }),

  draft: createDraft(),

  setCurrentUser(user: UserSchema): void {
    usersStore.state.currentUser = UserSchema.create(user);
  },

  /**
   * CrudStore implementation
   */

  add(users: BaseUserSchema[]): void {
    usersStore.state.list = users.map(UserSchema.create);
  },

  save(user: BaseUserSchema): void {
    StoreService.create().save(usersStore, user);
  },

  remove(userId: number): void {
    StoreService.create().remove(usersStore, userId);

    updateSelectedUser({
      ...usersStore.state.selected,
      isArchived: !usersStore.state.selected.isArchived,
    });
  },

  selected: {

    set(userId: number): void {
      const user: BaseUserSchema | undefined = userId === ZERO
        ? UserSchema.create()
        : findById(usersStore.state.list, userId);

      if (user) {
        updateSelectedUser(user);
        return;
      }

      throw new AppError(`User with id ${userId} not found`);
    },

    hadUpdates(): boolean {
      const { id, createdAt, updatedAt, archivedAt, address, ...updates } = this.getUpdates();
      const { id: addressId, ...addressUpdates } = address || {};

      return !!Object.keys(updates).length || !!Object.keys(addressUpdates).length;
    },

    // @TODO: fix
    // @ts-ignore
    getUpdates(): UserUpdates {
      const updates: UserUpdates | undefined = StoreService.create().getSelectedUpdates(usersStore);

      return updates || (usersStore.state.selected as UserSchema).getUpdates();
    },

  },

};

function updateSelectedUser(user: BaseUserSchema): void {
  usersStore.state.selected = UserSchema.create(user);
  usersStore.draft = createDraft(usersStore.state.selected);
}
