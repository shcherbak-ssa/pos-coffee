import type { MenuItem } from 'primereact/menuitem';

import type { Entity } from 'shared/types';
import { useStore } from 'view/hooks/store';

import type { AppStore } from '@admin/shared/types';
import { StoreName, PagePath, ControllerName, Action } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';

export function useUsersActionsMenuItemsProps(): ActionsMenuItemsProps {

  const { state: { currentUser } } = useStore(StoreName.APP) as AppStore;

  return {
    infoPagePath: PagePath.USERS_INFO,
    editPagePath: PagePath.USERS_EDIT,
    controllerName: ControllerName.USERS,
    overrides: {
      [Action.ARCHIVE]: (item: MenuItem, entity: Entity): MenuItem => {
        return {
          ...item,
          visible: item.visible && currentUser.id !== entity.id,
        };
      },
    },
  };

}
