import { proxy } from 'valtio';

import type { UserSchema as BaseUserSchema, StoreService as BaseStoreService } from 'shared/types';
import { EntityName } from 'shared/constants';
import { StoreService } from 'services/store';

import type { UserDraft, UsersState, UsersStore, UsersStoreActions, UserUpdates } from '@admin/shared/types';
import { createDraft, UserSchema } from '@admin/models/user';

export const usersStore: UsersStore & UsersStoreActions = {

  state: proxy({
    list: [],
    selected: UserSchema.create(),
  }),

  draft: createDraft(),

  add(users: BaseUserSchema[]): void {
    createStoreService().add(users);
  },

  save(user: BaseUserSchema): void {
    createStoreService().save(user);
  },

  remove(userId: number): void {
    createStoreService().remove(userId);
  },

  selected: {

    set(userId: number): void {
      createStoreService().setSelected(userId);
    },

    hadUpdates(): boolean {
      const { id, createdAt, updatedAt, archivedAt, address, ...updates } = this.getUpdates();
      const { id: addressId, ...addressUpdates } = address || {};

      return !!Object.keys(updates).length || !!Object.keys(addressUpdates).length;
    },

    // @TODO: fix
    // @ts-ignore
    getUpdates(): UserUpdates {
      const updates: Partial<BaseUserSchema> | undefined = createStoreService().getSelectedUpdates();

      return updates as UserUpdates || (usersStore.state.selected as UserSchema).getUpdates();
    },

  },

};

function createStoreService(): BaseStoreService<BaseUserSchema> {
  return StoreService.create<UsersState, BaseUserSchema, UserDraft>(
    EntityName.USER,
    usersStore,
    (user?: BaseUserSchema) => createDraft(user),
    (user?: BaseUserSchema) => UserSchema.create(user),
  );
}
