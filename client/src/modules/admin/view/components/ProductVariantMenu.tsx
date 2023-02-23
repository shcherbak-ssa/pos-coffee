import { useRef, type MouseEvent } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';

import { IconButton } from 'view/components/IconButton';

export type Props = {
  items: MenuItem[];
}

export function ProductVariantMenu({ items }: Props) {

  const menu = useRef<Menu>(null);

  function toggleMenu(e: MouseEvent): void {
    e.preventDefault();

    if (menu.current) {
      menu.current.toggle(e);
    }
  }

  return (
    <div>
      <IconButton
        icon={PrimeIcons.ELLIPSIS_H}
        click={toggleMenu}
      />

      <Menu
        model={items}
        ref={menu}
        popup
      />
    </div>
  );

}
