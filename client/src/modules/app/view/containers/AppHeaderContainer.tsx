import { MouseEvent, useRef } from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router';
import type { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';

import { EMPTY_STRING, IS_ACTIVE_CLASSNAME } from 'shared/constants';
import { logout } from 'shared/helpers/logout';
import { AppLogo } from 'view/components/AppLogo';
import { type Props as IconButtonProps, IconButton } from 'view/components/IconButton';

import { PagePath } from '@app/shared/constants';
import { AppCashierContainer } from '@app/view/containers/AppCashierContainer';

export function AppHeaderContainer() {

  const menuPanel = useRef<OverlayPanel>(null);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const iconButtons: IconButtonProps[] = [
    {
      icon: PrimeIcons.HOME,
      className: location.pathname === PagePath.HOME ? IS_ACTIVE_CLASSNAME : EMPTY_STRING,
      click(e: MouseEvent): void {
        navigate(PagePath.HOME);
      },
    },
    {
      icon: PrimeIcons.SHOPPING_CART,
      className: location.pathname === PagePath.CART ? IS_ACTIVE_CLASSNAME : EMPTY_STRING,
      click(e: MouseEvent): void {
        navigate(PagePath.CART);
      },
    },
  ];

  const menuItems: MenuItem[] = [
    {
      label: 'Logout',
      icon: PrimeIcons.SIGN_OUT,
      command: () => {
        logout();
      },
    },
  ];

  function toggleMenuPanel(e: MouseEvent): void {
    e.preventDefault();

    if (menuPanel.current) {
      menuPanel.current.toggle(e);
    }
  }

  return (
    <header className="flex items-center justify-between p-4 pb-0">
      <div className="flex items-center">
        <AppLogo />
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-4">
          { iconButtons.map((props, index) => <IconButton key={index} {...props} />) }
        </div>

        <Button
          className="ml-6 p-button-rounded"
          icon={PrimeIcons.BARS}
          onClick={toggleMenuPanel}
        />

        <OverlayPanel ref={menuPanel}>
          <div className="flex flex-col gap-2 w-60">
            <AppCashierContainer />

            <Divider />

            <Menu className="w-full" model={menuItems} />
          </div>
        </OverlayPanel>
      </div>
    </header>
  );

}
