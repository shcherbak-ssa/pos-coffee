import { useEffect } from 'react';

import { ErrorType } from 'shared/constants';
import { useError } from 'view/hooks/error';
import { useStore } from 'view/hooks/store';

import type { UserSchema, UsersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { UserPersonalInfo } from '@admin/view/components/user/UserPersonalInfo';
import { UserProfileInfo } from '@admin/view/components/user/UserProfileInfo';
import { UserLocationInfo } from '@admin/view/components/user/UserLocationInfo';

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

        <UserLocationInfo
          className="col-span-4"
          user={selectedUser}
          draftUser={draftUser}
          validationError={validationError}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );

}
