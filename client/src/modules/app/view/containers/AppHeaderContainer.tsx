import type { MouseEvent } from 'react';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router';
import { PrimeIcons } from 'primereact/api';

import { EMPTY_STRING } from 'shared/constants';
import { AppLogo } from 'view/components/AppLogo';
import { type Props as IconButtonProps, IconButton } from 'view/components/IconButton';

import { IS_ACTIVE_CLASSNAME, PagePath } from '@app/shared/constants';

export function AppHeaderContainer() {

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
      className: location.pathname.startsWith(PagePath.CART) ? IS_ACTIVE_CLASSNAME : EMPTY_STRING,
      click(e: MouseEvent): void {
        navigate(PagePath.CART);
      },
    },
    {
      icon: PrimeIcons.SHOPPING_BAG,
      className: location.pathname === PagePath.ORDERS ? IS_ACTIVE_CLASSNAME : EMPTY_STRING,
      click(e: MouseEvent): void {
        navigate(PagePath.ORDERS);
      },
    },
  ];

  return (
    <header className="flex items-center justify-between p-4 pb-0">
      <div className="flex items-center">
        <AppLogo />
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-4">
          { iconButtons.map((props, index) => <IconButton key={index} {...props} />) }
        </div>
      </div>
    </header>
  );

}
