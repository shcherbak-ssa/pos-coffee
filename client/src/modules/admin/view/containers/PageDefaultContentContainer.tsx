import type { ColumnProps } from 'primereact/column';

import type { Entity, EntityComponentProps, StoreEntityState } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { AppStore, EntityViewComponentProps } from '@admin/shared/types';
import { StoreName, ListView, PagePath } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { useSelectedEntities } from '@admin/view/hooks/select-entities';
import { EntityCardsContainer } from '@admin/view/containers/EntityCardsContainer';
import { EntityTableContainer } from '@admin/view/containers/EntityTableContainer';

export type Props<T> = {
  storeName: StoreName;
  infoPagePath: PagePath;
  tableColumns: ColumnProps[];
  actionsMenuItemsProps?: ActionsMenuItemsProps;
  EntityComponent?: React.ComponentType<EntityComponentProps<T>>;
}

export function PageDefaultContentContainer<T extends Entity>({
  storeName,
  infoPagePath,
  tableColumns,
  actionsMenuItemsProps,
  EntityComponent,
}: Props<T>) {

  const { state: { list } } = useStore(storeName) as StoreEntityState<T, T>;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;

  const [ isSelectEnable, selectedEntities, setSelectedEntities ] = useSelectedEntities<T>({ view });
  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(infoPagePath);

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
