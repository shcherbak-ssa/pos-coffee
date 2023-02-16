import type { UserSchema } from 'shared/types';

export async function renderApp(currentUser: UserSchema): Promise<void> {
  console.log('App: ', currentUser); // @TODO: implement
}
