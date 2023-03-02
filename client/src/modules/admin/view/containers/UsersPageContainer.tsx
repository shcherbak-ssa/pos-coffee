import type { ColumnProps } from 'primereact/column';

import { UsersImage } from 'view/components/UsersImage';

import { ControllerName, PagePath, StoreName } from '@admin/shared/constants';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { UsersCard } from '@admin/view/components/UsersCard';
import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { PageDefaultContentContainer } from '@admin/view/containers/PageDefaultContentContainer';

export function UsersPageContainer() {

  const actionsMenuItemsProps: ActionsMenuItemsProps = useUsersActionsMenuItemsProps();

  const usersTableColumns: ColumnProps[] = [
    {
      field: 'type',
      header: 'Type',
      body: UsersTypeLabel,
    },
    {
      field: 'image',
      header: 'Image',
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

  return (
    <PageDefaultContentContainer
      storeName={StoreName.USERS}
      controllerName={ControllerName.USERS}
      infoPagePath={PagePath.USERS_INFO}
      tableColumns={usersTableColumns}
      actionsMenuItemsProps={actionsMenuItemsProps}
      EntityComponent={UsersCard}
    />
  );

}
