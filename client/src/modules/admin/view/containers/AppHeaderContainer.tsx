import { MouseEvent, useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';

import type { UserSchema } from 'shared/types';
import { APP_NAME, LocalStorageKey, ROOT_PAGE_PATH } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';
import { replaceLocation } from 'shared/utils/replace-location';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { IconButton } from 'view/components/IconButton';

import type { AppComponentProps } from '@admin/shared/types';
import { PagePath } from '@admin/shared/constants';
import { UsersPhoto } from '@admin/view/components/UsersPhoto';

export type Props = AppComponentProps & {
  currentUser: UserSchema;
};

export function AppHeaderContainer({ isAppMenuOpen, appController, currentUser }: Props) {

  const userMenu = useRef<Menu>(null);

  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const toEditPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_EDIT);

  const userMenuItems: MenuItem[] = [
    {
      label: 'View details',
      icon: PrimeIcons.EYE,
      command: () => {
        toInfoPage({ id: currentUser.id });
      },
    },
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      command: () => {
        toEditPage({ id: currentUser.id });
      },
    },
    { separator: true },
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => {
        LocalStorage.remove(LocalStorageKey.USER_TOKEN);
        replaceLocation(ROOT_PAGE_PATH);
      },
    },
  ];

  function toggleAppMenu(): void {
    appController.setIsAppMenuOpen(!isAppMenuOpen);
  }

  function toggleUserMenu(e: MouseEvent): void {
    e.preventDefault();

    if (userMenu.current) {
      userMenu.current.toggle(e);
    }
  }

  return (
    <header className="
      app-header border-b-2
      flex items-center justify-between
      px-10 lg:px-6 h-24 w-full
      relative z-10 lg:z-30
    ">
      <div className="flex items-center">
        <IconButton
          className="mr-6"
          icon={isAppMenuOpen ? PrimeIcons.TIMES : PrimeIcons.BARS}
          click={toggleAppMenu}
        />

        <h1 className="app-name text-2xl">{ APP_NAME }</h1>
      </div>

      <div className="flex items-center click" onClick={toggleUserMenu}>
        <UsersPhoto
          size="large"
          photo={currentUser.photo}
        />
      </div>

      <Menu
        model={userMenuItems}
        ref={userMenu}
        popup
      />
    </header>
  );

}
