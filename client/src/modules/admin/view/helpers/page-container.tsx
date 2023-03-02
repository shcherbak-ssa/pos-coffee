import { useEffect, useState } from 'react';

import type { CrudController, Entity, StoreEntityState } from 'shared/types';
import type { EntityName } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { AppStore } from '@admin/shared/types';
import { ControllerName, ListTab, StoreName } from '@admin/shared/constants';
import { PageMessage } from '@admin/view/components/PageMessage';

export type Props = {
  entityName: EntityName;
  storeName: StoreName;
  controllerName: ControllerName;
}

export type ContainerProps = {
  page: number;
  pageSize: number;
}

export function pageContainer<T extends Entity>(
  Container: React.ComponentType,
  { entityName, storeName, controllerName }: Props,
): () => JSX.Element {

  return function () {

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const { state: { page, list } } = useStore(storeName) as StoreEntityState<T, T>;
    const { state: { view } } = useStore(StoreName.APP) as AppStore;

    const controller = useController(controllerName) as CrudController;

    useEffect(() => {
      loadEntities(view.listTab === ListTab.ARCHIVED);
    }, [view.listTab, page.page]);

    function loadEntities(isArchived: boolean): void {
      setIsLoading(true);

      controller.loadAll({
        page: page.page,
        pageSize: page.size,
        isArchived,
      })
        .then((success: boolean) => {
          if (success) {
            setIsLoading(false);
          }
        });
    }

    if (isLoading) {
      return <AppLoader />;
    }

    if (!list.length) {
      return (
        <PageMessage
          type="info"
          message={`No ${entityName.toLowerCase()}(s) found`}
        />
      );
    }

    return <Container />;

  }

}
