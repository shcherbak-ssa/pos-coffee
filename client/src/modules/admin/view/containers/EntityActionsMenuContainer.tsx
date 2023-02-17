import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { Entity } from 'shared/types';
import { IconButton } from 'view/components/IconButton';

import { ActionMenuItemsFunction, useGetActionsMenuItems } from '@admin/view/hooks/actions-menu-items';

export type Props<T extends Entity> = {
  entity: T;
  isEntityPage: boolean;
}

export function EntityActionsMenuContainer<T extends Entity>({ entity, isEntityPage }: Props<T>) {

  const menu = useRef<Menu>(null);

  const [ menuItems, setMenuItems ] = useState<MenuItem[]>([]);
  const getActionMenuItems: ActionMenuItemsFunction = useGetActionsMenuItems();

  useEffect(() => {
    if (getActionMenuItems) {
      setMenuItems(getActionMenuItems(entity, isEntityPage));
    }
  }, []);

  function toggleMenu(e: MouseEvent): void {
    e.preventDefault();

    if (menu.current) {
      menu.current.toggle(e);
    }
  }

  return (
    <div>
      {
        isEntityPage
          ? <Button
              className="p-button-sm"
              icon={PrimeIcons.ELLIPSIS_H}
              onClick={toggleMenu}
            />
          : <IconButton
              className="on-white"
              icon={PrimeIcons.ELLIPSIS_H}
              click={toggleMenu}
            />
      }

      <Menu
        model={menuItems}
        ref={menu}
        popup
      />
    </div>
  );

}
