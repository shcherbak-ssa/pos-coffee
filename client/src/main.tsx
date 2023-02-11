import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'view/styles/main.scss';

import { LocalStorageKey } from 'shared/constants';
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
    return; // @TODO: add
  }

  const { renderLogin } = await import('modules/login/main');
  renderLogin();
}

