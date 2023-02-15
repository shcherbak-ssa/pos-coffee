import { useEffect } from 'react';

import { ErrorType } from 'shared/constants';
import { useError } from 'view/hooks/error';
import { useStore } from 'view/hooks/store';

import type { UserSchema, UsersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { UserPersonalCard } from '@admin/view/components/user/UserPersonalCard';
import { UserProfileCard } from '@admin/view/components/user/UserProfileCard';
import { UserLocationCard } from '@admin/view/components/user/UserLocationCard';

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
        <UserPersonalCard user={selectedUser} />

        <UserProfileCard
          className="col-span-3"
          user={selectedUser}
          draftUser={draftUser}
          validationError={validationError}
          isEditMode={isEditMode}
        />

        <UserLocationCard className="col-span-4" user={selectedUser} />
      </div>
    </div>
  );

}
