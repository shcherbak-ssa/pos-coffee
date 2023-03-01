import { PrimeIcons } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';

import { LocalStorageKey, ROOT_PAGE_PATH } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';
import { replaceLocation } from 'shared/utils/replace-location';

export function logout(): void {
  confirmDialog({
    message: 'Are you sure you want to logout?',
    header: 'Logout',
    icon: PrimeIcons.EXCLAMATION_TRIANGLE,
    acceptClassName: 'p-button-danger',
    accept: () => {
      LocalStorage.remove(LocalStorageKey.USER_TOKEN);
      replaceLocation(ROOT_PAGE_PATH);
    },
  });
}
