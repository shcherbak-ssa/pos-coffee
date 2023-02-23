import { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  DataTable,
  type DataTableRowClickEvent,
  type DataTableSelectionChangeEvent,
} from 'primereact/datatable';
import { Column, type ColumnProps } from 'primereact/column';

import type { Entity } from 'shared/types';

import type { EntityViewComponentProps } from '@admin/shared/types';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';

export type Props<T extends Entity> = EntityViewComponentProps<T> & {
  columns: ColumnProps[];
}

export function EntityTableContainer<T extends Entity>({
  entities,
  selectEntity,
  columns,
  isSelectEnable,
  selectedEntities,
  setSelectedEntities,
  actionsMenuItemsProps,
}: Props<T>) {

  const [ columnsProps, setColumnsProps ] = useState<ColumnProps[]>([]);

  useEffect(() => {
    const columnsProps: ColumnProps[] = [
      getSelectionColumn(),
      ...columns,
    ];

    const actionsColumn: ColumnProps | undefined = getActionsColumn();

    if (actionsColumn) {
      columnsProps.push(actionsColumn);
    }

    setColumnsProps(columnsProps);
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

  function getActionsColumn(): ColumnProps | undefined {
    if (actionsMenuItemsProps) {
      return {
        field: 'actions',
        header: 'Actions',
        body: (entity: T) => (
          <EntityActionsMenuContainer
            entity={entity}
            isEntityPage={false}
            actionsMenuItemsProps={actionsMenuItemsProps}
          />
        ),
      };
    }
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
