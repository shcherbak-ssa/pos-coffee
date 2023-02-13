import { useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { IconButton } from 'view/components/IconButton';
import { PrimeIcons } from 'primereact/api';

export type Props = {
  items: MenuItem[];
}

export function TableColumnActionsMenu({ items }: Props) {

  return function() {
    const menu = useRef(null);

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

        <Menu model={items} ref={menu} popup />
      </div>
    );
  }

}
