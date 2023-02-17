import classnames from 'classnames';
import { DataTable, type DataTableRowClickEvent, type DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

import type { UserSchema } from 'shared/types';

import { UsersTypeLabel } from '@admin/view/components/UsersTypeLabel';
import { UsersPhoto } from '@admin/view/components/UsersPhoto';
import { UsersActionsMenuContainer } from '@admin/view/containers/users/UsersActionsMenuContainer';

export type Props = {
  users: UserSchema[];
  selectedUsers: UserSchema[];
  isSelectEnable: boolean;
  setSelectedUsers: (users: UserSchema[]) => void;
  selectUser: (user: UserSchema) => void;
}

export function UsersPageTableContainer({
  users,
  selectedUsers,
  isSelectEnable,
  setSelectedUsers,
  selectUser,
}: Props) {

  function selectUsers({ value }: DataTableSelectionChangeEvent<UserSchema[]>): void {
    // @ts-ignore
    setSelectedUsers(Array.isArray(value) ? value : [value]);
  }

  function handleRowDoubleClick(e: DataTableRowClickEvent): void {
    // @ts-ignore
    selectUser(e.data);
  }

  return (
    <div className="full">
      <DataTable
        className={classnames({ 'select-none': !isSelectEnable })}
        dataKey="id"
        value={users}
        responsiveLayout="scroll"
        selectionMode={isSelectEnable ? 'checkbox' : 'single'}
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
          body={UsersTypeLabel}
        />

        <Column
          field="photo"
          header="Photo"
          body={UsersPhoto}
        />

        <Column field="name" header="Name" />
        <Column field="surname" header="Surname" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />

        <Column
          field="actions"
          header="Actions"
          body={UsersActionsMenuContainer}
        />
      </DataTable>

      {/* @TODO: implement pagination */}
    </div>
  );

}
