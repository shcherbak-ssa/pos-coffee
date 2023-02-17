import type { MouseEvent } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router';
import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { ScrollPanel } from 'primereact/scrollpanel';

import { APP_NAME } from 'shared/constants';
import { useController } from 'view/hooks/controller';
import { useStore } from 'view/hooks/store';
import { IconButton } from 'view/components/IconButton';

import type { AppStore, AppController, AppMenuItem as AppMenuItemType } from '@admin/shared/types';
import { StoreName, ControllerName } from '@admin/shared/constants';
import { appMenuItems } from '@admin/shared/configs';
import { AppMenuItem } from '@admin/view/components/AppMenuItem';

export function AppMenuContainer() {

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function closeMenu(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }

    appController.setIsAppMenuOpen(false);
  }

  function handleItemClick(item: AppMenuItemType): void {
    navigate(item.to);

    if (isAppMenuOpen) {
      closeMenu();
    }
  }

  return (
    <>
      <div
        className={classnames('app-menu-container duration-200 h-full absolute top-0 z-30 lg:z-10', {
          'is-open': isAppMenuOpen,
          'is-close': !isAppMenuOpen,
        })}
      >
        <div className="border-r-2 full">
          <div
            className={classnames('border-b-2 flex items-center h-24', {
              'pl-6': isAppMenuOpen,
              'pl-8': !isAppMenuOpen,
            })}
          >
            <div className="flex items-center">
              <IconButton
                className="mr-6"
                icon={PrimeIcons.TIMES}
                click={closeMenu}
              />

              <h1 className="app-name text-2xl">{ APP_NAME }</h1>
            </div>
          </div>

          <ScrollPanel style={{ width: '100%', height: 'calc(100% - 6rem)' }}>
            <div
              className={classnames('flex flex-col gap-3 py-10 duration-200', {
                'px-4': isAppMenuOpen,
                'px-6': !isAppMenuOpen,
              })}
            >
              {
                appMenuItems.map((item, index) => (
                  <AppMenuItem
                    key={index}
                    item={item}
                    isItemActive={item.to === location.pathname}
                    isAppMenuOpen={isAppMenuOpen}
                    click={handleItemClick}
                  />
                ))
              }
            </div>
          </ScrollPanel>
        </div>
      </div>

      <div
        className={classnames('app-menu-overlay fixed top-0 left-0 z-10 full', {
          'block lg:hidden': isAppMenuOpen,
          'hidden': !isAppMenuOpen,
        })}
        onClick={closeMenu}
      />
    </>
  );

}
