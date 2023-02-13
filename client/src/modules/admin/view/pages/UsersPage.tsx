import { useEffect, useState } from 'react';
import type { ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { DataTable, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppPageSchema, UserSchema, UsersController, UsersStore } from 'modules/admin/shared/types';
import { ControllerName, PageTitle, StoreName } from 'modules/admin/shared/constants';
import { pages } from 'modules/admin/shared/configs';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';
import { PageContainer } from 'modules/admin/view/containers/PageContainer';

export function UsersPage() {

  const usersPage: AppPageSchema = pages[PageTitle.USERS];

  const addUserButtonProps: ButtonProps = {
    icon: PrimeIcons.PLUS,
    label: 'Add new user',
  };

  const [ isUsersLoaded, setIsUsersLoaded ] = useState<boolean>(false);
  const [ selectedUsers, setSelectedUsers ] = useState<UserSchema[]>([]);

  const { state: { users } } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;

  useEffect(() => {
    usersController.loadUsers()
      .then((success: boolean) => {
        if (success) {
          setIsUsersLoaded(true);
        }
      });
  }, []);

  function selectUsers({ value }: DataTableSelectionChangeEvent<UserSchema[]>): void {
    
  }

  return (
    <PageLayout page={usersPage}>
      <PageContainer
        page={usersPage}
        addButtonProps={addUserButtonProps}
      >
        <DataTable
          // dataKey="id"
          value={users}
          responsiveLayout="scroll"
          selection={selectedUsers}
          onSelectionChange={selectUsers}
        >
          <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
          <Column field="photo" header="Photo"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="surname" header="Surname"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="actions" header="Actions"></Column>
        </DataTable>
      </PageContainer>
    </PageLayout>
  );

}
