import { MouseEvent, useEffect, useRef, useState } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { PrimeIcons } from 'primereact/api';

import { IS_ACTIVE_CLASSNAME } from 'shared/constants';
import { logout } from 'shared/helpers/logout';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { UsersImage } from 'view/components/UsersImage';

import type { AppStore, AppController } from '@admin/shared/types';
import { ControllerName, PagePath, StoreName } from '@admin/shared/constants';
import { AppSearchContainer } from '@admin/view/containers/AppSearchContainer';
import { AppHeaderLogo } from '@admin/view/components/AppHeaderLogo';

export function AppHeaderContainer() {

  const userMenu = useRef<Menu>(null);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const { state: { isAppMenuOpen, currentPage, currentUser } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const [ headerMenuItems, setHeaderMenuItems ] = useState<MenuItem[]>([]);
  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const userMenuItems: MenuItem[] = [
    {
      label: 'View details',
      icon: PrimeIcons.EYE,
      command: () => {
        toInfoPage({ id: currentUser.id });
      },
    },
    { separator: true },
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => {
        logout();
      },
    },
  ];

  useEffect(() => {
    if (currentPage.headerMenuItem) {
      setHeaderMenuItems(
        currentPage.headerMenuItem
          .map(({ label, to }) => ({
            label,
            className: location.pathname === to ? IS_ACTIVE_CLASSNAME : '',
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
        <AppSearchContainer />

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
