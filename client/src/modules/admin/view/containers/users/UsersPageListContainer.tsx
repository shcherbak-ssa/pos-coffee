import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { DataTable, type DataTableRowClickEvent, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, type PaginatorPageStateEvent } from 'primereact/paginator';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { UserSchema, UsersStore } from '@admin/shared/types';
import { ListAction, PagePath, StoreName } from '@admin/shared/constants';
import { UserTypeLabel } from '@admin/view/components/user/UserTypeLabel';
import { UserPhoto } from '@admin/view/components/user/UserPhoto';
import { UsersTableActionsMenuContainer } from '@admin/view/containers/users/UsersTableActionsMenuContainer';

export function UsersPageListContainer() {

  const [ isSelectEnable, setIsSelectEnable ] = useState<boolean>(false);
  const [ selectedUsers, setSelectedUsers ] = useState<UserSchema[]>([]);
  const [ currentPage, setCurrentPage ] = useState<number>(ZERO);

  // @TODO: add toggle columns settings
  const { state: { users, view } } = useStore(StoreName.USERS) as UsersStore;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

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

  function handleRowDoubleClick(e: DataTableRowClickEvent): void {
    navigateToUsersInfoPage({ id: e.data.id });
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
        onRowDoubleClick={handleRowDoubleClick}
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
          body={UsersTableActionsMenuContainer}
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
