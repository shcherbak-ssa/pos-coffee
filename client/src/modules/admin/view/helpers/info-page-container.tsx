import { useEffect, useState } from 'react';
import { type Location, useLocation, useParams, Params } from 'react-router';

import type { CrudController, Entity, ErrorObject } from 'shared/types';
import { EntityName, ErrorType } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useError } from 'view/hooks/error';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { AppController, AppStore } from '@admin/shared/types';
import { ControllerName, NEW_ENTITY_LABEL, StoreName } from '@admin/shared/constants';
import { PageMessage } from '@admin/view/components/PageMessage';

export type Props = {
  controllerName: ControllerName;
  entityName: EntityName;
}

export function infoPageContainer<T extends Entity>(
  ContentComponent: React.ComponentType<{ validationError?: ErrorObject<T> }>,
  { controllerName, entityName }: Props,
): () => JSX.Element {

  return function () {

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);

    const location: Location = useLocation();
    const params: Params<string> = useParams();

    const { state: { isEditMode } } = useStore(StoreName.APP) as AppStore;
    const appController = useController(ControllerName.APP) as AppController;

    const controller = useController(controllerName) as CrudController;
    const [ validationError, cleanValidationError ] = useError<T>(ErrorType.VALIDATION, entityName);

    useEffect(() => {
      setIsLoading(true);

      if (params.id === NEW_ENTITY_LABEL) {
        controller.select()
          .then(() => {
            appController.setIsEditMode(true);
            setIsLoading(false);
          });

        return;
      }

      const entityId: number = Number(params.id);

      controller.loadById(entityId)
        .then((success) => {
          if (success) {
            controller.select(entityId)
              .then(() => {
                setIsLoading(false);
              });
          } else {
            setIsError(true);
          }
        });
    }, [location.pathname]);

    useEffect(() => {
      return () => {
        // @TODO: fix!!!
        appController.setIsEditMode(false);
      };
    }, []);

    useEffect(() => {
      cleanValidationError();
    }, [isEditMode]);

    if (isLoading) {
      return <AppLoader />;
    }

    if (isError) {
      return (
        <PageMessage
          type="info"
          message={`Something went wrong. No ${entityName.toLowerCase()} found`}
        />
      );
    }

    return <ContentComponent validationError={validationError} />;

  }

}
