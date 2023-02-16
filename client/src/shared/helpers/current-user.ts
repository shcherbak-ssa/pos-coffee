import type { CurrentUserSchema } from 'shared/types';
import { CURRENT_USER_API_ENDPOINT } from 'shared/constants';

export async function loadCurrentUser(): Promise<CurrentUserSchema> {
  const { ApiService } = await import('services/api');
  
  return await ApiService.create().get(CURRENT_USER_API_ENDPOINT);
}
