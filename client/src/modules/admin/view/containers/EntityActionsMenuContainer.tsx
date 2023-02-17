import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';

import type { Entity } from 'shared/types';
import { IconButton } from 'view/components/IconButton';

import type { ActionMenuItemOverride } from '@admin/shared/types';
import { Action } from '@admin/shared/constants';
import { entityActionsMenuItems } from '@admin/shared/configs';

export type Props = {
  overrideItems: ActionMenuItemOverride[];
  isEntityPage?: boolean;
  entity?: Entity;
}

export function EntityActionsMenuContainer({ overrideItems, isEntityPage = false, entity }: Props) {

  const menu = useRef<Menu>(null);

  const [ menuItems, setMenuItems ] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMenuItems(
      entityActionsMenuItems.map(({ label, icon, action }) => {
        const menuItem: MenuItem = { label, icon };
        const overrideItem: ActionMenuItemOverride | undefined
          = overrideItems.find((item) => item.action === action);

        if (overrideItem) {
          const { isVisible, command } = overrideItem;

          menuItem.visible = isItemVisible(action) && isVisible(entity?.id);
          menuItem.command = getActionCommand(action, command);
        }

        return menuItem;
      })
    );
  }, []);

  function getActionCommand(action: Action, command: (id: number) => void): () => void {
    const executeCommand = () => entity && command(entity.id);

    return () => {
      switch (action) {
        case Action.VIEW:
        case Action.EDIT:
          return executeCommand();
        case Action.DELETE:
          confirmDialog({
            header: 'Confirmation',
            message: 'Are you sure you want to delete this user?',
            icon: PrimeIcons.EXCLAMATION_TRIANGLE,
            acceptClassName: 'p-button-danger',
            accept: () => executeCommand(),
          });
          return;
        case Action.RESTORE:
          confirmDialog({
            header: 'Confirmation',
            message: 'Are you sure you want to restore this user?',
            icon: PrimeIcons.INFO_CIRCLE,
            accept: () => executeCommand(),
          });
          return;
      }
    };
  }

  function isItemVisible(action: Action): boolean {
    switch (action) {
      case Action.VIEW:
        return !isEntityPage;
      case Action.EDIT:
        return entity ? !entity.isDeleted : true;
      case Action.DELETE:
        return entity ? !entity.isDeleted : true;
      case Action.RESTORE:
        return entity ? !!entity.isDeleted : false;
    }

    return false;
  }

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
