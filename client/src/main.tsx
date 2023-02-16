import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'view/styles/main.scss';

import type { UserSchema } from 'shared/types';
import { LocalStorageKey, UserType } from 'shared/constants';
import { AuthError } from 'shared/errors';
import { LocalStorage } from 'shared/helpers/local-storage';
import { render } from 'shared/helpers/setup-view';

renderLoader()
  .then(checkUserToken)
  .then(renderNext)
  .catch(console.error);

async function renderLoader(): Promise<void> {
  const { AppLoader } = await import('view/components/AppLoader');

  render(<AppLoader />);
}

function checkUserToken(): boolean {
  return LocalStorage.has(LocalStorageKey.USER_TOKEN);
}

async function renderNext(isTokenExist: boolean): Promise<void> {
  if (isTokenExist) {
    try {
      const { loadCurrentUser } = await import('shared/helpers/current-user');
      const currentUser: UserSchema = await loadCurrentUser();

      if (currentUser.type === UserType.ADMIN) {
        const { renderAdmin } = await import('@admin/main');

        return await renderAdmin(currentUser);
      } else {
        const { renderApp } = await import('@app/main');

        return await renderApp(currentUser);
      }
    } catch (e: any) {
      if (e instanceof AuthError) {
        redirectToLogin();
        return;
      }

      console.error(e);
    }

    return;
  }

  redirectToLogin();
}

function redirectToLogin(): void {
  import('shared/helpers/to-login')
    .then(({ toLogin }) => {
      toLogin();
    });
}
