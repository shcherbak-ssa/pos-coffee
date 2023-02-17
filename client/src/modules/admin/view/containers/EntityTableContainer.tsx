import { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  DataTable,
  type DataTableValue,
  type DataTableRowClickEvent,
  type DataTableSelectionChangeEvent,
} from 'primereact/datatable';
import { Column, type ColumnProps } from 'primereact/column';

import type { Entity } from 'shared/types';

import type { ActionMenuItemOverride } from '@admin/shared/types';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';

export type Props<T extends DataTableValue> = {
  entities: T[];
  overrideActionItems: ActionMenuItemOverride[];
  selectEntity: (entity: T) => void;
  columns: ColumnProps[];
  isSelectEnable: boolean;
  selectedEntities: T[];
  setSelectedEntities: (entities: T[]) => void;
}

export function EntityTableContainer<T extends DataTableValue>({
  entities,
  overrideActionItems,
  selectEntity,
  columns,
  isSelectEnable,
  selectedEntities,
  setSelectedEntities,
}: Props<T>) {

  const [ columnsProps, setColumnsProps ] = useState<ColumnProps[]>([]);

  useEffect(() => {
    setColumnsProps([
      getSelectionColumn(),
      ...columns,
      getActionsColumn(),
    ]);
  }, [columns, isSelectEnable]);

  function selectEntities({ value }: DataTableSelectionChangeEvent<T[]>): void {
    // @ts-ignore
    setSelectedEntities(Array.isArray(value) ? value : [value]);
  }

  function handleRowDoubleClick(e: DataTableRowClickEvent): void {
    // @ts-ignore
    selectEntity(e.data);
  }

  function getSelectionColumn(): ColumnProps {
    return {
      field: 'selection',
      selectionMode: isSelectEnable ? 'multiple' : undefined,
      headerStyle: isSelectEnable ? { width: '3em' } : { width: '0', padding: '0' },
    };
  }

  function getActionsColumn(): ColumnProps {
    return {
      field: 'actions',
      header: 'Actions',
      body: (entity: Entity) => (
        <EntityActionsMenuContainer
          overrideItems={overrideActionItems}
          entity={entity}
        />
      ),
    };
  }

  return (
    <div className="full">
      <DataTable
        className={classnames({ 'select-none': !isSelectEnable })}
        dataKey="id"
        value={entities}
        responsiveLayout="scroll"
        selectionMode={isSelectEnable ? 'checkbox' : 'single'}
        selection={selectedEntities}
        onSelectionChange={selectEntities}
        onRowDoubleClick={handleRowDoubleClick}
      >
        { columnsProps.map((props) => <Column key={props.field} {...props} />) }
      </DataTable>

      {/* @TODO: implement pagination */}
    </div>
  );

}
