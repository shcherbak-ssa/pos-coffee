import type { CurrentUserSchema } from 'shared/types';

export async function renderApp(currentUser: CurrentUserSchema): Promise<void> {
  console.log('App: ', currentUser); // @TODO: implement
}
