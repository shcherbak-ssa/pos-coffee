import { useEffect, useState } from 'react';
import type { DataTableValue } from 'primereact/datatable';
import type { ColumnProps } from 'primereact/column';

import type { Entity, UserSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { ActionMenuItemOverride, AppStore, UsersController, UsersStore } from '@admin/shared/types';
import { Action, ControllerName, ListTab, ListView, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { useSelectedEntities } from '@admin/view/hooks/select-entities';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { EntityCardsContainer } from '@admin/view/containers/EntityCardsContainer';
import { EntityTableContainer } from '@admin/view/containers/EntityTableContainer';
import { UsersPersonalInfo } from '@admin/view/components/UsersPersonalInfo';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersPhoto } from '@admin/view/components/UsersPhoto';

export function UsersPageContainer() {

  const [ isUsersLoading, setIsUsersLoading ] = useState<boolean>(true);
  const [ pageLayoutProps, setPageLayoutProps ] = useState<Omit<PageLayoutProps, 'children'>>();

  const { state: { users, currentUser } } = useStore(StoreName.USERS) as UsersStore;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;

  const usersController = useController(ControllerName.USERS) as UsersController;
  const [ isSelectEnable, selectedEntities, setSelectedEntities ] = useSelectedEntities<UserSchema>({ view });

  const toUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const toUsersEditPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_EDIT);

  const overrideActionItems: ActionMenuItemOverride[] = [
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

  const usersTableColumns: ColumnProps[] = [
    {
      field: 'type',
      header: 'Type',
      body: UsersTypeLabel,
    },
    {
      field: 'photo',
      header: 'Photo',
      body: UsersPhoto,
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'surname',
      header: 'Surname',
    },
    {
      field: 'email',
      header: 'Email',
    },
    {
      field: 'phone',
      header: 'Phone',
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
        entityActionsProps: { overrideItems: overrideActionItems },
      },
      showSubHeader: !isUsersLoading,
      tabs: [
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

  function selectUser(user: UserSchema): void {
    console.log(user);
  }

  function drawContent(): React.ReactNode {
    if (view.listView === ListView.TABLE) {
      return (
        <EntityTableContainer
          entities={users}
          overrideActionItems={overrideActionItems}
          selectEntity={(entity: DataTableValue) => selectUser(entity as UserSchema)}
          columns={usersTableColumns}
          isSelectEnable={isSelectEnable}
          selectedEntities={selectedEntities}
          setSelectedEntities={setSelectedEntities}
        />
      );
    }

    if (view.listView === ListView.CARD) {
      return (
        <EntityCardsContainer
          entities={users}
          overrideActionItems={overrideActionItems}
          selectEntity={(entity: Entity) => selectUser(entity as UserSchema)}
          EntityComponent={UsersPersonalInfo}
          isSelectEnable={isSelectEnable}
          selectedEntities={selectedEntities}
          setSelectedEntities={setSelectedEntities}
        />
      );
    }

    return <EmptyComponent />;
  }

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        { drawContent() }
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
