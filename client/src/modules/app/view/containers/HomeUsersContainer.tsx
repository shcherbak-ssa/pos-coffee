import { type MouseEvent, useState } from 'react';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { ScrollPanel } from 'primereact/scrollpanel';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { CardHeading } from 'view/components/CardHeading';

import type { AppController, AppStore, UserSchema } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';
import { AppCashierContainer } from '@app/view/containers/AppCashierContainer';
import { AppUserSelectPopupContainer } from '@app/view/containers/AppUserSelectPopupContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';
import { AppUser } from '@app/view/components/AppUser';
import { CardListWrapper } from '@app/view/components/CardListWrapper';

export function HomeUsersContainer() {

  const { state: { users }, usersList } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const [ isPopupOpen, setIsPopupOpen ] = useState<boolean>(false);

  function filterUsers(): UserSchema[] {
    const loggedUserIds: number[] = users.loggedUsers.map(({ id }) => id);

    return usersList.filter((user) => !loggedUserIds.includes(user.id));
  }

  function confirmSelection(user: UserSchema): void {
    appController.addLoggedUser(user)
      .then(() => {
        closePopup();
      });
  }

  function removeLoggedUser(user: UserSchema): void {
    appController.removeLoggedUser(user);
  }

  function openPopup(e: MouseEvent): void {
    e.preventDefault();

    setIsPopupOpen(true);
  }

  function closePopup(): void {
    setIsPopupOpen(false);
  }

  function renderManager(): React.ReactNode {
    if (users.manager) {
      return <AppUser type="Manager" user={users.manager} />;
    }
  }

  return (
    <CardWrapper>
      <div className="flex items-center justify-between mb-6">
        <CardHeading className="mb-0" heading="Users" />

        <Button
          className="p-button-sm p-button-rounded"
          icon={PrimeIcons.PLUS}
          onClick={openPopup}
        />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        { renderManager() }

        <AppCashierContainer />
      </div>

      <Divider align="left">
        <div className="text-sm">Logged users</div>
      </Divider>

      <ScrollPanel className="mt-6" style={{ width: '100%', height: '180px' }}>
        <CardListWrapper>
          {
            users.loggedUsers.map((user) => (
              <AppUser
                key={user.id}
                user={user}
                cancel={user.id === users.manager?.id ? undefined : removeLoggedUser}
              />
            ))
          }
        </CardListWrapper>
      </ScrollPanel>

      <AppUserSelectPopupContainer
        heading="Login user"
        isOpen={isPopupOpen}
        close={closePopup}
        confirm={confirmSelection}
        filter={filterUsers}
      />
    </CardWrapper>
  );

}
