import { useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { confirmDialog } from 'primereact/confirmdialog';
import { PrimeIcons } from 'primereact/api';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { IconButton } from 'view/components/IconButton';

import type { UserSchema, UsersController, UsersStore } from '@admin/shared/types';
import { Action, ControllerName, PagePath, StoreName } from '@admin/shared/constants';

export function UsersTableActionsMenu({ id, isDeleted }: UserSchema) {

  const menu = useRef(null);

  const { state: { currentUser } } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const actionItems: MenuItem[] = [
    {
      label: 'View',
      icon: PrimeIcons.EYE,
      command: () => {
        handleAction(Action.VIEW);
      },
    },
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      command: () => {
        handleAction(Action.EDIT );
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: !isDeleted && currentUser.id !== id,
      command: () => {
        handleAction(Action.DELETE);
      },
    },
    {
      label: 'Restore',
      icon: PrimeIcons.REPLAY,
      visible: isDeleted,
      command: () => {
        handleAction(Action.RESTORE);
      },
    },
  ];

  function handleAction(action: Action): void {
    switch (action) {
      case Action.VIEW:
        return navigateToUsersInfoPage({ id });
      case Action.EDIT:
        return navigateToUsersInfoPage({ id }, { isEditMode: true });
      case Action.DELETE:
        confirmDialog({
          header: 'Confirmation',
          message: 'Are you sure you want to delete this user?',
          icon: PrimeIcons.EXCLAMATION_TRIANGLE,
          acceptClassName: 'p-button-danger',
          accept: () => {
            usersController.deleteUser(id);
          },
        });
        return;
      case Action.RESTORE:
        confirmDialog({
          header: 'Confirmation',
          message: 'Are you sure you want to restore this user?',
          icon: PrimeIcons.INFO_CIRCLE,
          accept: () => {
            usersController.restoreUser(id);
          },
        });
        return;
    }
  }

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
        model={actionItems}
        ref={menu}
        popup
      />
    </div>
  );

}
