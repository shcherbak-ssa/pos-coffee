import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import type { MenuItem } from 'primereact/menuitem';
import { DataTable, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, type PaginatorPageStateEvent } from 'primereact/paginator';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { UserSchema, UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, ListAction, StoreName } from '@admin/shared/constants';
import { TableColumnActionsMenu } from '@admin/view/components/TableColumnActionsMenu';
import { UserTypeLabel } from '@admin/view/components/UserTypeLabel';

export function UsersPageContentContainer() {

  const [ isUsersLoaded, setIsUsersLoaded ] = useState<boolean>(false);
  const [ isSelectEnable, setIsSelectEnable ] = useState<boolean>(false);
  const [ selectedUsers, setSelectedUsers ] = useState<UserSchema[]>([]);
  const [ currentPage, setCurrentPage ] = useState<number>(ZERO);

  const { state: { users, view } } = useStore(StoreName.USERS) as UsersStore;
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

  useEffect(() => {
    const selectEnable: boolean = view.listAction.includes(ListAction.SELECT);

    setIsSelectEnable(selectEnable);

    if (!selectEnable) {
      setSelectedUsers([]);
    }

  }, [view.listAction]);

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
        className={classnames({ 'select-none': !isSelectEnable })}
        dataKey="id"
        value={users}
        responsiveLayout="scroll"
        selectionMode={isSelectEnable ? 'checkbox' : undefined}
        selection={selectedUsers}
        onSelectionChange={selectUsers}
      >
        {
          isSelectEnable
            ? <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
            : <Column selectionMode={undefined} headerStyle={{ width: '0', padding: '0' }} />
        }

        <Column
          field="type"
          header="Type"
          body={UserTypeLabel}
        />

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
