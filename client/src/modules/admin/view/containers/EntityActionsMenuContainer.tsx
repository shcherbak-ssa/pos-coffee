import { useRef, type MouseEvent } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { Entity } from 'shared/types';
import { IconButton } from 'view/components/IconButton';

import { Props as ActionsMenuItemsProps, useActionsMenuItems } from '@admin/view/hooks/actions-menu-items';

export type Props<T extends Entity> = {
  entity: T;
  actionsMenuItemsProps: ActionsMenuItemsProps;
  isEntityPage: boolean;
}

export function EntityActionsMenuContainer<T extends Entity>({
  entity,
  actionsMenuItemsProps,
  isEntityPage,
}: Props<T>) {

  const menu = useRef<Menu>(null);

  const actionsMenuItems: MenuItem[] = useActionsMenuItems({
    ...actionsMenuItemsProps,
    entity,
    isEntityPage,
  });

  function toggleMenu(e: MouseEvent): void {
    e.preventDefault();

    if (menu.current) {
      menu.current.toggle(e);
    }
  }

  function drawButton(): React.ReactNode {
    if (isEntityPage) {
      return (
        <Button
          className="p-button-sm p-button-rounded"
          icon={PrimeIcons.BARS}
          onClick={toggleMenu}
        />
      );
    }

    return (
      <IconButton
        className="on-white"
        icon={PrimeIcons.ELLIPSIS_H}
        click={toggleMenu}
      />
    );
  }

  return (
    <div>
      { drawButton() }

      <Menu
        model={actionsMenuItems}
        ref={menu}
        popup
      />
    </div>
  );

}
