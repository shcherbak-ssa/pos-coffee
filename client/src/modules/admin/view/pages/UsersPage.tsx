import { useEffect, useState } from 'react';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { ActionMenuItemOverride, AppStore, UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle, ListTab, StoreName, Action } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { type Props as PageLayoutPage, PageLayout } from '@admin/view/layouts/PageLayout';

export function UsersPage() {

  const [ isUsersLoading, setIsUsersLoading ] = useState<boolean>(true);
  const [ pageLayoutProps, setPageLayoutProps ] = useState<Omit<PageLayoutPage, 'children'>>();

  const { state: { users, currentUser } } = useStore(StoreName.USERS) as UsersStore;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;
  const usersController = useController(ControllerName.USERS) as UsersController;

  const toUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const toUsersEditPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_EDIT);

  const overrideItems: ActionMenuItemOverride[] = [
    {
      action: Action.VIEW,
      isVisible: () => true,
      command: (id: number) => {
        toUsersInfoPage({ id });
      },
    },
    {
      action: Action.EDIT,
      isVisible: () => true,
      command: (id: number) => {
        toUsersEditPage({ id });
      },
    },
    {
      action: Action.DELETE,
      isVisible: (id?: number) => currentUser.id !== id,
      command: (id: number) => {
        usersController.deleteUser(id);
      },
    },
    {
      action: Action.RESTORE,
      isVisible: () => true,
      command: (id: number) => {
        usersController.restoreUser(id);
      },
    },
  ];

  useEffect(() => {
    loadUsers(view.listTab === ListTab.DELETED);
  }, []);

  useEffect(() => {
    setPageLayoutProps({
      page: pages[PageTitle.USERS],
      actionsProps: {
        isEntityPage: false,
        addActionProps: isUsersLoading ? undefined : {
          label: 'Create new user',
          to: PagePath.USERS_CREATE,
        },
        entityActionsProps: { overrideItems },
      },
      showSubHeader: !isUsersLoading,
      tabs: isUsersLoading ? [] : [
        {
          label: 'Active',
          listTab: ListTab.ACTIVE,
          command: () => {
            loadUsers(false);
          },
        },
        {
          label: 'Deleted',
          listTab: ListTab.DELETED,
          command: () => {
            loadUsers(true);
          },
        },
      ],
      isLoading: isUsersLoading,
      messageProps: users.length ? undefined : {
        type: 'info',
        message: 'No users found',
      },
    });
  }, [isUsersLoading, users]);

  function loadUsers(onlyDeleted: boolean): void {
    setIsUsersLoading(true);

    usersController.loadUsers({ onlyDeleted })
      .then((success: boolean) => {
        if (success) {
          setIsUsersLoading(false);
        }
      });
  }

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <div></div>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
