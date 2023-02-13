import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import { EMPTY_STRING } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppController, AppStore } from 'modules/admin/shared/types';
import { ControllerName, StoreName } from 'modules/admin/shared/constants';

export function PageHeaderContainer() {

  const appStore = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function openMenu(): void {
    appController.setIsAppMenuOpen(true);
  }

  return (
    <header className="page-header flex items-center justify-between p-4 w-full">
      <div className="flex items-center">
        {
          appStore.state.isAppMenuOpen
            ? EMPTY_STRING
            : <Button
                className="mr-2 p-button-text p-button-sm"
                icon={PrimeIcons.BARS}
                onClick={openMenu}
              />
        }

        <h1 className="text-2xl">{ appStore.state.currentPage?.title }</h1>
      </div>
    </header>
  );

}
