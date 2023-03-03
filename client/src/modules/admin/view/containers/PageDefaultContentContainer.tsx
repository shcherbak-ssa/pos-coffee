import { useState } from 'react';
import type { ColumnProps } from 'primereact/column';
import { Paginator, type PaginatorPageStateEvent } from 'primereact/paginator';

import type { CrudController, Entity, EntityComponentProps, StoreEntityState } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { AppStore, EntityViewComponentProps } from '@admin/shared/types';
import { StoreName, ListView, PagePath, ControllerName } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { useSelectedEntities } from '@admin/view/hooks/select-entities';
import { EntityCardsContainer } from '@admin/view/containers/EntityCardsContainer';
import { EntityTableContainer } from '@admin/view/containers/EntityTableContainer';
import { useController } from 'view/hooks/controller';

export type Props<T> = {
  storeName: StoreName;
  controllerName: ControllerName;
  infoPagePath: PagePath;
  tableColumns: ColumnProps[];
  actionsMenuItemsProps?: ActionsMenuItemsProps;
  EntityComponent?: React.ComponentType<EntityComponentProps<T>>;
}

export function PageDefaultContentContainer<T extends Entity>({
  storeName,
  controllerName,
  infoPagePath,
  tableColumns,
  actionsMenuItemsProps,
  EntityComponent,
}: Props<T>) {

  const { state: { page, list } } = useStore(storeName) as StoreEntityState<T, T>;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;

  const [ isSelectEnable, selectedEntities, setSelectedEntities ] = useSelectedEntities<T>({ view });
  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(infoPagePath);

  const constroller = useController(controllerName) as CrudController<{}, T>;

  const entityViewComponentProps: EntityViewComponentProps<T> = {
    entities: list,
    selectEntity: selectEntity,
    isSelectEnable,
    selectedEntities,
    setSelectedEntities,
    actionsMenuItemsProps,
  };

  function selectEntity(entity: T): void {
    toInfoPage({ id: entity.id });
  }

  function changePage(e: PaginatorPageStateEvent): void {
    constroller.updatePage({ page: e.page, size: e.rows });
  }

  function renderContent(): React.ReactNode {
    if (view.listView === ListView.TABLE) {
      return (
        <EntityTableContainer
          columns={tableColumns}
          {...entityViewComponentProps}
        />
      );
    }

    if (view.listView === ListView.CARD) {
      return (
        <EntityCardsContainer
          EntityComponent={EntityComponent || EmptyComponent}
          {...entityViewComponentProps}
        />
      );
    }

    return <EmptyComponent />;
  }

  return (
    <>
      { renderContent() }

      <div className="p-4">
        <Paginator
          first={page.size * page.page}
          rows={page.size}
          totalRecords={page.total}
          onPageChange={changePage}
          template={{ layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport' }}
        />
      </div>
    </>
  );

}
