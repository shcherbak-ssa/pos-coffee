import { useEffect, useState } from 'react';
import type { ColumnProps } from 'primereact/column';

import type { CrudController, Entity, EntityComponentProps, StoreEntityState } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { AppPageSchema, AppStore, EntityViewComponentProps, PageAddButtonProps } from '@admin/shared/types';
import { ControllerName, ListTab, ListView, PagePath, StoreName } from '@admin/shared/constants';
import { useSelectedEntities } from '@admin/view/hooks/select-entities';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import type { Props as PageLayoutProps } from '@admin/view/layouts/PageLayout';
import { EntityTableContainer } from '@admin/view/containers/EntityTableContainer';
import { EntityCardsContainer } from '@admin/view/containers/EntityCardsContainer';

export type Props<T> = {
  page: AppPageSchema;
  storeName: StoreName;
  controllerName: ControllerName;
  addButton: PageAddButtonProps;
  infoPagePath: PagePath;
  actionsMenuItemsProps: ActionsMenuItemsProps;
  EntityComponent?: React.ComponentType<EntityComponentProps<T>>;
  tableColums?: ColumnProps[];
  showSubHeader?: boolean;
  pageContent?: (props: EntityViewComponentProps<T>) => React.ReactNode;
}

export function usePageContainer<T extends Entity>({
  page,
  storeName,
  controllerName,
  addButton,
  infoPagePath,
  actionsMenuItemsProps,
  EntityComponent,
  tableColums = [],
  showSubHeader = true,
  pageContent,
}: Props<T>): PageLayoutProps | undefined {

  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ pageLayoutProps, setPageLayoutProps ] = useState<Omit<PageLayoutProps, 'children'>>();

  const { state: { list } } = useStore(storeName) as StoreEntityState<T, T>;
  const { state: { view } } = useStore(StoreName.APP) as AppStore;

  const controller = useController(controllerName) as CrudController;
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

  useEffect(() => {
    loadEntities(view.listTab === ListTab.ARCHIVE);
  }, []);

  useEffect(() => {
    setPageLayoutProps({
      page,
      showSubHeader,
      addButton,
      isEntityPage: false,
      tabs: [
        {
          label: 'Active',
          listTab: ListTab.ACTIVE,
          command: () => {
            loadEntities(false);
          },
        },
        {
          label: 'Archived',
          listTab: ListTab.ARCHIVE,
          command: () => {
            loadEntities(true);
          },
        },
      ],
      isLoading,
      messageProps: list.length ? undefined : {
        type: 'info',
        message: 'No users found',
      },
    });
  }, [isLoading, list]);

  function loadEntities(onlyArchived: boolean): void {
    setIsLoading(true);

    controller.loadAll({ onlyArchived })
      .then((success: boolean) => {
        if (success) {
          setIsLoading(false);
        }
      });
  }

  function selectEntity(entity: T): void {
    toInfoPage({ id: entity.id });
  }

  function drawContent(): React.ReactNode {
    if (pageContent) {
      return pageContent(entityViewComponentProps);
    }

    if (view.listView === ListView.TABLE) {
      return (
        <EntityTableContainer
          columns={tableColums}
          { ...entityViewComponentProps }
        />
      );
    }

    if (view.listView === ListView.CARD) {
      return (
        <EntityCardsContainer
          EntityComponent={EntityComponent || EmptyComponent}
          { ...entityViewComponentProps }
        />
      );
    }
  }

  if (pageLayoutProps) {
    return {
      ...pageLayoutProps,
      children: drawContent(),
    };
  }

}
