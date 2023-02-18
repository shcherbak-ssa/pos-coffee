import { useEffect, useState } from 'react';
import type { ColumnProps } from 'primereact/column';

import type { UserSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { AppStore, EntityViewComponentProps, UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, ListTab, ListView, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { useSelectedEntities } from '@admin/view/hooks/select-entities';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { EntityCardsContainer } from '@admin/view/containers/EntityCardsContainer';
import { EntityTableContainer } from '@admin/view/containers/EntityTableContainer';
import { UsersPersonalCard } from '@admin/view/components/UsersPersonalCard';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersPhoto } from '@admin/view/components/UsersPhoto';

export function UsersPageContainer() {

  const [ isUsersLoading, setIsUsersLoading ] = useState<boolean>(true);
  const [ pageLayoutProps, setPageLayoutProps ] = useState<Omit<PageLayoutProps, 'children'>>();

  const { state: { users } } = useStore(StoreName.USERS) as UsersStore;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;

  const usersController = useController(ControllerName.USERS) as UsersController;
  const [ isSelectEnable, selectedEntities, setSelectedEntities ] = useSelectedEntities<UserSchema>({ view });

  const toUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const actionsMenuItemsProps: ActionsMenuItemsProps = useUsersActionsMenuItemsProps();

  const entityViewComponentProps: EntityViewComponentProps<UserSchema> = {
    entities: users,
    selectEntity: selectUser,
    isSelectEnable,
    selectedEntities,
    setSelectedEntities,
    actionsMenuItemsProps,
  };

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
    loadUsers(view.listTab === ListTab.ARCHIVE);
  }, []);

  useEffect(() => {
    setPageLayoutProps({
      page: pages[PageTitle.USERS],
      showSubHeader: true,
      addButton: {
        label: 'Create new user',
        to: PagePath.USERS_CREATE,
      },
      isEntityPage: false,
      tabs: [
        {
          label: 'Active',
          listTab: ListTab.ACTIVE,
          command: () => {
            loadUsers(false);
          },
        },
        {
          label: 'Archived',
          listTab: ListTab.ARCHIVE,
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

  function loadUsers(onlyArchived: boolean): void {
    setIsUsersLoading(true);

    usersController.loadAll({ onlyArchived })
      .then((success: boolean) => {
        if (success) {
          setIsUsersLoading(false);
        }
      });
  }

  function selectUser(user: UserSchema): void {
    toUsersInfoPage({ id: user.id });
  }

  function drawContent(): React.ReactNode {
    if (view.listView === ListView.TABLE) {
      return (
        <EntityTableContainer
          columns={usersTableColumns}
          { ...entityViewComponentProps }
        />
      );
    }

    if (view.listView === ListView.CARD) {
      return (
        <EntityCardsContainer
          EntityComponent={UsersPersonalCard}
          { ...entityViewComponentProps }
        />
      );
    }
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
