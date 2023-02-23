import type { ColumnProps } from 'primereact/column';

import { EntityName } from 'shared/constants';
import { EmptyComponent } from 'view/components/EmptyComponent';

import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { usePageContainer } from '@admin/view/hooks/page-container';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { UsersCard } from '@admin/view/components/UsersCard';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersImage } from '@admin/view/components/UsersImage';

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
      body: UsersImage,
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
    page: pages[PageTitle.USERS],
    entityName: EntityName.USER,
    storeName: StoreName.USERS,
    controllerName: ControllerName.USERS,
    infoPagePath: PagePath.USERS_INFO,
    actionsMenuItemsProps,
    tableColumns: usersTableColumns,
    EntityComponent: UsersCard,
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
