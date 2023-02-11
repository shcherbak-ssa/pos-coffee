import 'modules/login/view/styles/login.scss';

import { LocalStorageKey, PagePath } from 'shared/constants';
import { Context } from 'shared/context';
import { LocalStorage } from 'shared/helpers/local-storage';
import { setupPrimeReact, render } from 'shared/helpers/setup-view';

import { LoaderService } from 'modules/login/services/loader';

export async function renderLogin(): Promise<void> {
  setup();

  const { LoginContainer } = await import('modules/login/view/containers/LoginContainer');

  render(<LoginContainer />);
}

function setup(): void {
  setupPrimeReact();
  Context.setLoader(LoaderService.create());

  const { pathname } = location;

  if (pathname.trim() !== PagePath.LOGIN) {
    LocalStorage.set(LocalStorageKey.LAST_URL, pathname);
  }
}
