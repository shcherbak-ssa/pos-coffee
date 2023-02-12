import type { CurrentUserSchema } from 'shared/types';

export async function renderAdmin(currentUser: CurrentUserSchema): Promise<void> {
  console.log('Admin: ', currentUser); // @TODO: implement
}
