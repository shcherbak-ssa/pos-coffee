import { useEffect, useState } from 'react';
import { PrimeIcons } from 'primereact/api';
import type { MenuItem } from 'primereact/menuitem';
import { DataTable, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, type PaginatorPageStateEvent } from 'primereact/paginator';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { UserSchema, UsersController, UsersStore } from 'modules/admin/shared/types';
import { ControllerName, StoreName } from 'modules/admin/shared/constants';
import { TableColumnActionsMenu } from 'modules/admin/view/components/TableColumnActionsMenu';

export function UsersPageContentContainer() {

  const [ isUsersLoaded, setIsUsersLoaded ] = useState<boolean>(false);
  const [ selectedUsers, setSelectedUsers ] = useState<UserSchema[]>([]);
  const [ currentPage, setCurrentPage ] = useState<number>(ZERO);

  const { state: { users } } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;

  const actionItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
    },
  ];

  useEffect(() => {
    usersController.loadUsers()
      .then((success: boolean) => {
        if (success) {
          setIsUsersLoaded(true);
        }
      });
  }, []);

  function selectUsers({ value }: DataTableSelectionChangeEvent<UserSchema[]>): void {
    // @ts-ignore
    setSelectedUsers(value);
  }

  function handlePageChange(e: PaginatorPageStateEvent): void {
    setCurrentPage(e.first);
  }

  return (
    <div className="full">
      <DataTable
        dataKey="id"
        value={users}
        responsiveLayout="scroll"
        selection={selectedUsers}
        onSelectionChange={selectUsers}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
        <Column field="photo" header="Photo" />
        <Column field="name" header="Name" />
        <Column field="surname" header="Surname" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />

        <Column
          field="actions"
          header="Actions"
          body={TableColumnActionsMenu({ items: actionItems })}
        />
      </DataTable>

      {/* @TODO: implement */}
      <div className="px-6 py-4">
        <Paginator
          first={currentPage}
          totalRecords={users.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );

}
