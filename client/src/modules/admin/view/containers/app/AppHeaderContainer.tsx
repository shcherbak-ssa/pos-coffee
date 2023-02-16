import { PrimeIcons } from 'primereact/api';

import { APP_NAME } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { IconButton } from 'view/components/IconButton';

import type { AppController, AppStore } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';

export function AppHeaderContainer() {

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function toggleMenu(): void {
    appController.setIsAppMenuOpen(!isAppMenuOpen);
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
          click={toggleMenu}
        />

        <h1 className="app-name text-2xl">{ APP_NAME }</h1>
      </div>
    </header>
  );

}
