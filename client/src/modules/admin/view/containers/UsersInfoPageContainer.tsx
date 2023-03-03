import type { ErrorObject, UserSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';

import type { AppStore, UsersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { AddressCard } from '@admin/view/components/AddressCard';
import { UsersProfileCard } from '@admin/view/components/UsersProfileCard';
import { UsersCard } from '@admin/view/components/UsersCard';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';

export type Props = {
  validationError?: ErrorObject<UserSchema>;
}

export function UsersInfoPageContainer({ validationError }: Props) {

  const { state: { isEditMode } } = useStore(StoreName.APP) as AppStore;
  const { state: { selected: selectedUser }, draft: draftUser } = useStore(StoreName.USERS) as UsersStore;

  function renderAddressCard(): React.ReactNode {
    if (selectedUser.address) {
      return (
        <AddressCard
          className="col-span-4"
          entity={selectedUser.address}
          entityDraft={draftUser.address}
          validationError={validationError}
          isEditMode={isEditMode}
        />
      );
    }
  }

  return (
    <InfoPageWrapper className="grid-cols-4">
      <UsersCard entity={selectedUser} />

      <UsersProfileCard
        className="col-span-3"
        entity={selectedUser}
        entityDraft={draftUser}
        validationError={validationError}
        isEditMode={isEditMode}
      />

      { renderAddressCard() }
    </InfoPageWrapper>
  );

}
