import { useEffect } from 'react';

import type { UserSchema } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { useError } from 'view/hooks/error';
import { useStore } from 'view/hooks/store';

import type { UsersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { UserPersonalInfo } from '@admin/view/components/user/UserPersonalInfo';
import { UserProfileInfo } from '@admin/view/components/user/UserProfileInfo';
import { LocationInfo } from '@admin/view/components/card/LocationInfo';

export type Props = {
  isEditMode: boolean;
}

export function UsersPageInfoContainer({ isEditMode }: Props) {

  const { state: { selectedUser }, draftUser } = useStore(StoreName.USERS) as UsersStore;
  const [ validationError, cleanValidationError ] = useError<UserSchema>(ErrorType.VALIDATION);

  useEffect(() => {
    cleanValidationError();
  }, [isEditMode]);

  useEffect(() => {
    return () => {
      cleanValidationError();
    };
  }, []);

  return (
    <div className="full p-6">
      <div className="grid grid-cols-4 gap-4 full">
        <UserPersonalInfo user={selectedUser} />

        <UserProfileInfo
          className="col-span-3"
          user={selectedUser}
          draftUser={draftUser}
          validationError={validationError}
          isEditMode={isEditMode}
        />

        <LocationInfo
          className="col-span-4"
          address={selectedUser.address}
          draftAddress={draftUser.address}
          validationError={validationError}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );

}
