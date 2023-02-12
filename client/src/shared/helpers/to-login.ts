import { LocalStorageKey } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';

export async function toLogin(): Promise<void> {
  LocalStorage.remove(LocalStorageKey.USER_TOKEN);

  const { renderLogin } = await import('modules/login/main');

  await renderLogin();
}
