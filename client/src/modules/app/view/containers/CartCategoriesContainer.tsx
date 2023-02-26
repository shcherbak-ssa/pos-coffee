import { useEffect, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menubar } from 'primereact/menubar';

import { EMPTY_STRING, ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CartController, CartStore } from '@app/shared/types';
import { ControllerName, IS_ACTIVE_CLASSNAME, StoreName } from '@app/shared/constants';
import { ScrollPanel } from 'primereact/scrollpanel';

export function CartCategoriesContainer() {

  const { state: { activeCategoryId, categories } } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  const [ menuItems, setMenuItems ] = useState<MenuItem[]>(parseCategoriesToTabs());

  useEffect(() => {
    setMenuItems(parseCategoriesToTabs());
  }, [activeCategoryId]);

  function parseCategoriesToTabs(): MenuItem[] {
    return [{ id: ZERO, name: 'All' }, ...categories].map(({ id, name }) => ({
      label: name.toUpperCase(),
      className: id === activeCategoryId ? IS_ACTIVE_CLASSNAME : EMPTY_STRING,
      command: () => {
        cartController.setActiveCategoryId(id);
      },
    }));
  }

  return (
    <div
      className="categories overflow-hidden"
      style={{ height: '56px', width: '645px' }}
    >
      <ScrollPanel style={{ height: '100%', width: '640px' }}>
        <div className="px-4">
          <Menubar model={menuItems} />
        </div>
      </ScrollPanel>
    </div>
  );

}
