import { useEffect } from 'react';

import type { UserSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { UsersStore } from '@admin/shared/types';
import { ListView, PagePath, StoreName } from '@admin/shared/constants';
import { useListSelect } from '@admin/view/hooks/list-select';
import {
  type Props as TableProps,
  UsersPageTableContainer,
} from '@admin/view/containers/users/UsersPageTableContainer';
import { UsersPageCardsContainer } from '@admin/view/containers/users/UsersPageCardsContainer';
import { PageMessage } from '@admin/view/components/page/PageMessage';

export function UsersPageListContainer() {

  const { state: { users, view } } = useStore(StoreName.USERS) as UsersStore;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const [ isSelectEnable, selectedUsers, setSelectedUsers ] = useListSelect<UserSchema>({ view });

  const usersViewProps: TableProps = {
    users,
    selectedUsers,
    isSelectEnable,
    setSelectedUsers,
    selectUser: ({ id }: UserSchema): void => {
      navigateToUsersInfoPage({ id });
    },
  };

  useEffect(() => {
    setSelectedUsers([]);
  }, [view.listTab, view.listView]);

  if (users.length === ZERO) {
    return <PageMessage type="info" message="No users found" />;
  }

  if (view.listView === ListView.TABLE) {
    return <UsersPageTableContainer {...usersViewProps} />;
  }

  if (view.listView === ListView.CARD) {
    return <UsersPageCardsContainer {...usersViewProps} />;
  }

  return <EmptyComponent />;

}
