import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import type { MenuItem } from 'primereact/menuitem';
import { DataTable, type DataTableRowClickEvent, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, type PaginatorPageStateEvent } from 'primereact/paginator';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { ActionPayload, UserSchema, UsersStore } from '@admin/shared/types';
import { Action, ListAction, PagePath, StoreName } from '@admin/shared/constants';
import { TableColumnActionsMenu } from '@admin/view/components/TableColumnActionsMenu';
import { UserTypeLabel } from '@admin/view/components/user/UserTypeLabel';
import { UserPhoto } from '@admin/view/components/user/UserPhoto';

export function UsersPageListContainer() {

  const [ isSelectEnable, setIsSelectEnable ] = useState<boolean>(false);
  const [ selectedUsers, setSelectedUsers ] = useState<UserSchema[]>([]);
  const [ currentPage, setCurrentPage ] = useState<number>(ZERO);

  // @TODO: add toggle columns settings
  const { state: { users, view } } = useStore(StoreName.USERS) as UsersStore;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const actionItems: MenuItem[] = [
    {
      label: 'View',
      icon: PrimeIcons.EYE,
      data: { action: Action.VIEW },
    },
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      data: { action: Action.EDIT },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      data: { action: Action.DELETE },
    },
  ];

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

  function handleAction({ action, id }: ActionPayload): void {
    switch (action) {
      case Action.VIEW:
        return navigateToUsersInfoPage({ id });
    }
  }

  function handleRowClick(e: DataTableRowClickEvent): void {
    console.log(e);
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
        onRowClick={handleRowClick}
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

        <Column
          field="photo"
          header="Photo"
          body={UserPhoto}
        />

        <Column field="name" header="Name" />
        <Column field="surname" header="Surname" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />

        <Column
          field="actions"
          header="Actions"
          body={TableColumnActionsMenu({ items: actionItems, handleAction })}
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
