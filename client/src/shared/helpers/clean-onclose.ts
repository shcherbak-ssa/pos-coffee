import { LocalStorageKey } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';

export function setupCleanDataOncloseEvents(): void {
  window.addEventListener('unload', cleanData);
  window.addEventListener('beforeunload', cleanData);
}

function cleanData(): void {
  LocalStorage.remove(LocalStorageKey.LAST_LIST_PAGE_TAB);
}
