import { MouseEvent, useState } from 'react';
import classnames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';

import type { EmptyFunction } from 'shared/types';
import { useStore } from 'view/hooks/store';

import type { AppStore, UserSchema } from '@app/shared/types';
import { StoreName } from '@app/shared/constants';
import { CardListWrapper } from '@app/view/components/CardListWrapper';
import { AppUser } from '@app/view/components/AppUser';

export type Props = {
  heading: string;
  isOpen: boolean;
  close: EmptyFunction;
  confirm: (user: UserSchema) => void;
  filter?: (users: UserSchema[]) => UserSchema[];
}

export function AppUserSelectPopupContainer({
  heading,
  isOpen,
  close,
  confirm,
  filter = (users: UserSchema[]) => users,
}: Props) {

  const { state: { users } } = useStore(StoreName.APP) as AppStore;
  const [ selectedUser, setSelectedUser ] = useState<UserSchema>();

  function selectUser(user: UserSchema): void {
    setSelectedUser(user.id === selectedUser?.id ? undefined : user);
  }

  function confirmSelection(e: MouseEvent): void {
    e.preventDefault()

    if (selectedUser) {
      confirm(selectedUser);
      closePopup();
    }
  }

  function closePopup(): void {
    setSelectedUser(undefined);
    close();
  }

  function handleClose(e: MouseEvent): void {
    e.preventDefault();

    closePopup();
  }

  return (
    <Dialog
      className="popup"
      header={heading}
      visible={isOpen}
      onHide={close}
    >
      <div>
        <ScrollPanel style={{ width: '100%', height: '200px' }}>
          <CardListWrapper>
            {
              filter(users.loggedUsers).map((user) => (
                <AppUser
                  className={classnames({
                    'bg-gray-100': user.id === selectedUser?.id,
                  })}
                  key={user.id}
                  user={user}
                  click={selectUser}
                />
              ))
            }
          </CardListWrapper>
        </ScrollPanel>

        <div className="grid grid-cols-2 gap-4 py-2">
          <Button
            className="p-button-sm p-button-text"
            label="Cancel"
            onClick={handleClose}
          />

          <Button
            className="p-button-sm"
            label="Confirm"
            disabled={!selectedUser}
            onClick={confirmSelection}
          />
        </div>
      </div>
    </Dialog>
  );

}
