import '@login/view/styles/login.scss';

import { LocalStorageKey } from 'shared/constants';
import { Context } from 'shared/context';
import { LocalStorage } from 'shared/helpers/local-storage';
import { setupPrimeReact, render } from 'shared/helpers/setup-view';

import { LOGIN_PAGE_PATH } from '@login/shared/constants';
import { LoaderService } from '@login/services/loader';

export async function renderLogin(): Promise<void> {
  setup();

  const { LoginContainer } = await import('@login/view/containers/LoginContainer');

  render(<LoginContainer />);
}

function setup(): void {
  setupPrimeReact();
  Context.setLoader(LoaderService.create());

  const { pathname } = location;

  if (pathname.trim() !== LOGIN_PAGE_PATH) {
    LocalStorage.set(LocalStorageKey.LAST_URL, pathname);
  }
}
