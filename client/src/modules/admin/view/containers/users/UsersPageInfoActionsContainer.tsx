import { useState } from 'react';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import { EMPTY_STRING } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { UsersStore, UsersController } from '@admin/shared/types';
import { StoreName, ControllerName, PagePath } from '@admin/shared/constants';
import { UsersActionsMenuContainer } from '@admin/view/containers/users/UsersActionsMenuContainer';

export type Props = {
  isEditMode: boolean;
}

export function UsersPageInfoActionsContainer({ isEditMode }: Props) {

  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const { state: { selectedUser } } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  function saveUser(e: MouseEvent): void {
    e.preventDefault();

    if (isSaveProcessing || !isEditMode) {
      return;
    }

    setIsSaveProcessing(true);

    usersController.saveUser(selectedUser)
      .then((id: number | void) => {
        if (id) {
          navigateToUsersInfoPage({ id });
        }

        setIsSaveProcessing(false);
      });
  }

  return (
    <div className="flex gap-4">
      {
        isEditMode && !selectedUser.isDeleted
          ? <Button
              className="p-button-sm"
              icon={PrimeIcons.SAVE}
              label="Save"
              loading={isSaveProcessing}
              // @ts-ignore
              onClick={saveUser}
            />
          : EMPTY_STRING
      }

      {
        selectedUser.isDeleted
          ? <Button
              className="button-label p-button-text p-button-danger"
              label="DELETED"
              disabled
            />
          : EMPTY_STRING
      }

      <UsersActionsMenuContainer {...selectedUser} isInfoPage />
    </div>
  );

}
