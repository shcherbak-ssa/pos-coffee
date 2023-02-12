import type { CurrentUserSchema } from 'shared/types';
import { CURRENT_USER_API_ENDPOINT } from 'shared/constants';
import { ApiService } from 'services/api';

export async function loadCurrentUser(): Promise<CurrentUserSchema> {
  return await ApiService.create().get(CURRENT_USER_API_ENDPOINT);
}
