import { LocalStorageKey } from 'shared/constants';
import { LocalStorage } from 'shared/utils';
import { renderLogin, renderLoader, renderApp } from 'view/main';

renderLoader()
  .then(checkUserToken)
  .then(renderNext)
  .catch(console.error);

function checkUserToken(): boolean {
  return LocalStorage.has(LocalStorageKey.USER_TOKEN);
}

function renderNext(isTokenExist: boolean): void {
  if (isTokenExist) {
    return renderApp();
  }

  renderLogin();
}
