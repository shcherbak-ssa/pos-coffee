import { type MouseEvent, useState } from 'react';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppController, AppStore, UserSchema } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';
import { AppUserSelectPopupContainer } from '@app/view/containers/AppUserSelectPopupContainer';
import { AppUserEmptyCashier } from '@app/view/components/AppUserEmptyCashier';
import { AppUser } from '@app/view/components/AppUser';

export function AppCashierContainer() {

  const { state: { users } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const [ isPopupOpen, setIsPopupOpen ] = useState<boolean>(false);

  function confirmSelection(user: UserSchema): void {
    appController.setCashier(user)
      .then(() => {
        closePopup();
      });
  }

  function removeCashier(): void {
    appController.setCashier(null);
  }

  function openPopup(): void {
    setIsPopupOpen(true);
  }

  function closePopup(): void {
    setIsPopupOpen(false);
  }

  function renderCashier(): React.ReactNode {
    if (users.cashier) {
      return (
        <AppUser
          type="Cashier"
          user={users.cashier}
          cancel={removeCashier}
        />
      );
    }

    return <AppUserEmptyCashier click={openPopup} />;
  }

  return (
    <div>
      { renderCashier() }

      <AppUserSelectPopupContainer
        heading="Select cashier"
        isOpen={isPopupOpen}
        close={closePopup}
        confirm={confirmSelection}
      />
    </div>
  );

}
