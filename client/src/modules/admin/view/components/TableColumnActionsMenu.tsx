import { useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';

import { IconButton } from 'view/components/IconButton';

import type { ActionPayload } from '@admin/shared/types';

export type Props = {
  items: MenuItem[];
  handleAction: (payload: ActionPayload) => void;
  isVisible?: (id: number, item: MenuItem) => boolean;
}

export function TableColumnActionsMenu({ items, handleAction, isVisible }: Props) {

  return function({ id }: { id: number }) {
    const menu = useRef(null);

    const menuItems: MenuItem[] = items.map((item) => {
      return {
        ...item,
        visible: isVisible && isVisible(id, item),
        command: () => {
          handleAction({ id, action: item.data.action });
        },
      };
    });

    function toggleMenu(e: MouseEvent): void {
      // @ts-ignore
      menu.current.toggle(e);
    }

    return (
      <div>
        <IconButton
          className="on-white"
          icon={PrimeIcons.ELLIPSIS_H}
          click={toggleMenu}
        />

        <Menu
          model={menuItems}
          ref={menu}
          popup
        />
      </div>
    );
  }

}
