import { LocalStorageKey, PagePath } from 'shared/constants';
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

  const { pathname } = location;

  if (pathname.trim() !== PagePath.LOGIN) {
    LocalStorage.set(LocalStorageKey.LAST_URL, pathname);
  }

  renderLogin();
}
