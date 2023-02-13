import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { ScrollPanel } from 'primereact/scrollpanel';

import { APP_NAME } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { IconButton } from 'view/components/IconButton';

import type { AppController, AppStore } from 'modules/admin/shared/types';
import { appMenuItems } from 'modules/admin/shared/configs';
import { ControllerName, StoreName } from 'modules/admin/shared/constants';
import { AppMenuItemContainer } from 'modules/admin/view/containers/app/AppMenuItemContainer';

export function AppMenuContainer() {

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function closeMenu(): void {
    appController.setIsAppMenuOpen(false);
  }

  return (
    <>
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
              appMenuItems.map((item, index) => {
                return (
                  <AppMenuItemContainer
                    key={index}
                    item={item}
                    closeMenu={closeMenu}
                  />
                );
              })
            }
          </div>
        </ScrollPanel>
      </div>
    </>
  );

}
