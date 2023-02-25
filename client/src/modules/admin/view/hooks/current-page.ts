import { useEffect, useState } from 'react';

import { EMPTY_STRING } from 'shared/constants';
import { updatePageTitle } from 'shared/utils/page-title';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppPageSchema, AppController, AppStore } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';

export function useCurrentPage(page: AppPageSchema): void {

  const { state: { selectedEntityTitle } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const [ currentPage, setCurrentPage ] = useState<AppPageSchema>(page);

  useEffect(() => {
    setCurrentPage({
      ...page,
      child: {
        title: selectedEntityTitle,
      },
    });
  }, [page, selectedEntityTitle]);

  useEffect(() => {
    appController.setCurrentPage(currentPage)
      .then(() => {
        updatePageTitle(currentPage.child?.title || currentPage.title);
      });
  }, [currentPage]);

  useEffect(() => {
    return () => {
      updatePageTitle();
      appController.setSelectedEntityTitle(EMPTY_STRING);
    };
  }, []);

}
