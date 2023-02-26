import { useEffect, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';

import { EMPTY_STRING, ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { MenuController, MenuStore } from '@app/shared/types';
import { ControllerName, IS_ACTIVE_CLASSNAME, StoreName } from '@app/shared/constants';

export function CartCategoriesContainer() {

  const { state: { activeCategoryId, categories } } = useStore(StoreName.MENU) as MenuStore;
  const menuController = useController(ControllerName.MENU) as MenuController;

  const [ menuItems, setMenuItems ] = useState<MenuItem[]>(parseCategoriesToTabs());

  useEffect(() => {
    setMenuItems(parseCategoriesToTabs());
  }, [activeCategoryId]);

  function parseCategoriesToTabs(): MenuItem[] {
    return [{ id: ZERO, name: 'All' }, ...categories].map(({ id, name }) => ({
      label: name.toUpperCase(),
      className: id === activeCategoryId ? IS_ACTIVE_CLASSNAME : EMPTY_STRING,
      command: () => {
        menuController.setActiveCategoryId(id);
      },
    }));
  }

  return (
    <div className="categories px-4">
      <Menubar model={menuItems} />
    </div>
  );

}
