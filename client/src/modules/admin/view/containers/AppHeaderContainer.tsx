import { MouseEvent, useEffect, useRef, useState } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { PrimeIcons } from 'primereact/api';

import { LocalStorageKey, ROOT_PAGE_PATH } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';
import { replaceLocation } from 'shared/utils/replace-location';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { IconButton } from 'view/components/IconButton';

import type { AppComponentProps } from '@admin/shared/types';
import { PagePath } from '@admin/shared/constants';
import { UsersImage } from '@admin/view/components/UsersImage';
import { AppHeaderLogo } from '@admin/view/components/AppHeaderLogo';

export type Props = AppComponentProps;

export function AppHeaderContainer({ appStore, appController }: Props) {

  const { isAppMenuOpen, currentPage, currentUser } = appStore.state;

  const userMenu = useRef<Menu>(null);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const [ headerMenuItems, setHeaderMenuItems ] = useState<MenuItem[]>([]);

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

  useEffect(() => {
    if (currentPage.headerMenuItem) {
      setHeaderMenuItems(
        currentPage.headerMenuItem
          .map(({ label, to }) => ({
            label,
            className: location.pathname === to ? 'is-active' : '',
            command: () => {
              navigate(to);
            },
          }))
      );
    } else {
      setHeaderMenuItems([]);
    }
  }, [currentPage, location.pathname]);

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
        <AppHeaderLogo
          className="mr-10"
          isAppMenuOpen={isAppMenuOpen}
          click={toggleAppMenu}
        />

        <div>
          <Menubar model={headerMenuItems} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <IconButton
          icon={PrimeIcons.SEARCH}
          click={() => {}}
        />

        <div className="flex items-center click" onClick={toggleUserMenu}>
          <UsersImage
            size="large"
            image={currentUser.image}
          />
        </div>
      </div>

      <Menu
        model={userMenuItems}
        ref={userMenu}
        popup
      />
    </header>
  );

}
