import { useEffect, useState } from 'react';
import { type Location, useLocation, useParams, Params } from 'react-router';

import type { CrudController, Entity, StoreEntityState } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { ErrorObjectHook, useError } from 'view/hooks/error';
import { useController } from 'view/hooks/controller';
import { useStore } from 'view/hooks/store';

import type { AppPageSchema } from '@admin/shared/types';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import type { Props as PageLayoutProps } from '@admin/view/layouts/PageLayout';
import { ControllerName, PagePath, PagePathLabel, PageTitle, StoreName } from '@admin/shared/constants';

export type Props = {
  page: AppPageSchema;
  isEditMode: boolean;
  storeName: StoreName;
  controllerName: ControllerName;
  actionsMenuItemsProps: ActionsMenuItemsProps;
  infoPagePath: PagePath;
  errorMessage: string;
}

export type Return<T> = [
  Omit<PageLayoutProps, 'children'> | undefined,
  ErrorObjectHook<T>,
]

export function useInfoPageContainer<T extends Entity>({
  page,
  isEditMode,
  storeName,
  controllerName,
  actionsMenuItemsProps,
  infoPagePath,
  errorMessage,
}: Props): Return<T> {

  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ pageLayoutProps, setPageLayoutProps ] = useState<Omit<PageLayoutProps, 'children'>>();
  const [ isError, setIsError ] = useState<boolean>(false);

  const location: Location = useLocation();
  const params: Params<string> = useParams();

  const { state: { selected } } = useStore(storeName) as StoreEntityState;
  const controller = useController(controllerName) as CrudController;
  const [ validationError, cleanValidationError ] = useError<T>(ErrorType.VALIDATION);

  useEffect(() => {
    setPageLayoutProps({
      page: page,
      actionProps: {
        actionsMenuItemsProps,
        entity: selected as T,
        controllerName,
        infoPagePath,
      },
      showSubHeader: false,
      isEntityPage: true,
      isLoading: isLoading && !isError,
      messageProps: !isError ? undefined : {
        type: 'error',
        message: errorMessage,
      },
    });
  }, [isLoading, isError, selected]);

  useEffect(() => {
    setIsLoading(true);

    if (location.pathname.endsWith(PagePathLabel.CREATE)) {
      controller.select()
        .then(() => {
          setIsLoading(false);
        });

      return;
    }

    const userId: number = Number(params.id);

    controller.loadById(userId)
      .then((success) => {
        if (success) {
          controller.select(userId)
            .then(() => {
              setIsLoading(false);
            });
        } else {
          setIsError(true);
        }
      });
  }, [location.pathname]);

  useEffect(() => {
    cleanValidationError();
  }, [isEditMode]);

  useEffect(() => () => cleanValidationError(), []);

  return [ pageLayoutProps, validationError];

}
