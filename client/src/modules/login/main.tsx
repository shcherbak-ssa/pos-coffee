import './styles/login.scss';

import { LoaderService } from 'modules/login/services/loader';

import { LocalStorageKey, PagePath } from 'shared/constants';
import { Context } from 'shared/context';
import { LocalStorage } from 'shared/utils/local-storage';
import { setupPrimeReact, render } from 'shared/utils/setup-view';

export async function renderLogin(): Promise<void> {
  setup();

  const { LoginContainer } = await import('modules/login/containers/LoginContainer');

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
