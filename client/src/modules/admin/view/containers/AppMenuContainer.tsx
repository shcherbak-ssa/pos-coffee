import { PrimeIcons } from 'primereact/api';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';

import { useController } from 'view/hooks/controller';
import { AppLogo } from 'view/components/AppLogo';

import type { AppController } from 'modules/admin/shared/types';
import { ControllerName } from 'modules/admin/shared/constants';
import { mainMenuItems } from 'modules/admin/shared/configs/main-menu';
import { AppMenuItemContainer } from 'modules/admin/view/containers/AppMenuItemContainer';

export function AppMenuContainer() {

  const appController = useController(ControllerName.APP) as AppController;

  function closeMenu(): void {
    appController.setIsAppMenuOpen(false);
  }

  return (
    <div className="main-menu pb-4 full">
      <div className="p-4 mb-6 flex items-center justify-between">
        <AppLogo
          className="text-white"
          type="inline"
          onDark={true}
        />

        <Button
          className="main-menu-toggle  p-button-text p-button-sm"
          icon={PrimeIcons.ANGLE_DOUBLE_LEFT}
          onClick={closeMenu}
        />
      </div>

      <ScrollPanel style={{ width: '100%', height: 'calc(100% - 100px)' }}>
        {
          mainMenuItems.map((item, index) => {
            return <AppMenuItemContainer key={index} item={item} />;
          })
        }
      </ScrollPanel>
    </div>
  );

}
