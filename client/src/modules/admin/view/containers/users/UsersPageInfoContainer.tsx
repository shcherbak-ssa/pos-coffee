import { useStore } from 'view/hooks/store';

import type { UsersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { UserPersonalCard } from '@admin/view/components/user/UserPersonalCard';
import { UserProfileCard } from '@admin/view/components/user/UserProfileCard';
import { UserLocationCard } from '@admin/view/components/user/UserLocationCard';
import { useState } from 'react';

export function UsersPageInfoContainer() {

  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const { state: { selectedUser } } = useStore(StoreName.USERS) as UsersStore;

  return (
    <div className="full p-6">
      <div className="grid grid-cols-4 gap-4 full">
        <UserPersonalCard user={selectedUser} />

        <UserProfileCard
          className="col-span-3"
          user={selectedUser}
          isEditMode={isEditMode}
        />

        <UserLocationCard className="col-span-4" user={selectedUser} />
      </div>
    </div>
  );

}
