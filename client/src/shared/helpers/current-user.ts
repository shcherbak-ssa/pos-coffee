import type { CurrentUserSchema } from 'shared/types';
import { ApiEndpoint } from 'shared/constants';
import { ApiService } from 'services/api';

export async function loadCurrentUser(): Promise<CurrentUserSchema> {
  return await ApiService.create().get(ApiEndpoint.USERS);
}
