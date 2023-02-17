import { useEffect } from 'react';

import type { UserSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { AppStore, UsersStore } from '@admin/shared/types';
import { ListView, PagePath, StoreName } from '@admin/shared/constants';
import { useListSelect } from '@admin/view/hooks/list-select';
import {
  type Props as UsersViewProps,
  UsersPageTableContainer,
} from '@admin/view/containers/users/UsersPageTableContainer';
import { UsersPageCardsContainer } from '@admin/view/containers/users/UsersPageCardsContainer';

export function UsersPageListContainer() {

  const { state: { users } } = useStore(StoreName.USERS) as UsersStore;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;

  const toUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const [ isSelectEnable, selectedUsers, setSelectedUsers ] = useListSelect<UserSchema>({ view });

  const usersViewProps: UsersViewProps = {
    users,
    selectedUsers,
    isSelectEnable,
    setSelectedUsers,
    selectUser: ({ id }: UserSchema): void => {
      toUsersInfoPage({ id });
    },
  };

  useEffect(
    () => setSelectedUsers([]),
    [view.listTab, view.listView],
  );

  if (view.listView === ListView.TABLE) {
    return <UsersPageTableContainer {...usersViewProps} />;
  }

  if (view.listView === ListView.CARD) {
    return <UsersPageCardsContainer {...usersViewProps} />;
  }

  return <EmptyComponent />;

}
