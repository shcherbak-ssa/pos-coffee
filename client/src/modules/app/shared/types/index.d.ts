import type { UserSchema as BaseUserSchema, StoreState } from 'shared/types';

/**
 * Helpers
 */

export type Controllers =
  | AppController;

/**
 * App
 */

export type AppState = {
  loggedUser: UserSchema;
}

export interface AppStore extends StoreState<AppState> {}

export interface AppStoreActions extends AppStore {
  setLoggedUser(user: UserSchema): void;
}

export interface AppController {
  setLoggedUser(user: UserSchema): Promise<void>;
}

/**
 * User
 */

export type UserSchema = Pick<
  BaseUserSchema,
  'id' | 'name' | 'surname' | 'image'
>;
