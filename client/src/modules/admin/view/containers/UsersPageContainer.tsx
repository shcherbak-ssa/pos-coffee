import type { ColumnProps } from 'primereact/column';

import { EmptyComponent } from 'view/components/EmptyComponent';

import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { usePageContainer } from '@admin/view/hooks/page-container';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { UsersPersonalCard } from '@admin/view/components/UsersPersonalCard';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersPhoto } from '@admin/view/components/UsersPhoto';

export function UsersPageContainer() {

  const actionsMenuItemsProps: ActionsMenuItemsProps = useUsersActionsMenuItemsProps();

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

  const pageLayoutProps: PageLayoutProps | undefined = usePageContainer({
    pageTitle: PageTitle.USERS,
    storeName: StoreName.USERS,
    controllerName: ControllerName.USERS,
    infoPagePath: PagePath.USERS_INFO,
    actionsMenuItemsProps,
    tableColums: usersTableColumns,
    EntityComponent: UsersPersonalCard,
    addButton: {
      label: 'Create new user',
      to: PagePath.USERS_CREATE,
    },
  });

  if (pageLayoutProps) {
    return <PageLayout {...pageLayoutProps} />;
  }

  return <EmptyComponent />;

}
