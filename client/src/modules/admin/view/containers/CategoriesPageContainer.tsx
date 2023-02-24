import { Dialog } from 'primereact/dialog';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppController, CategoriesController, CategoriesStore } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { CategoriesListContainer } from '@admin/view/containers/CategoriesListContainer';
import { CategoriesSelectedContainer } from '@admin/view/containers/CategoriesSelectedContainer';

export function CategoriesPageContainer() {

  const { state: { isPopupOpen } } = useStore(StoreName.CATEGORIES) as CategoriesStore;

  const appController = useController(ControllerName.APP) as AppController;
  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  function hidePopup(): void {
    categoriesController.setIsPopupOpen(false)
      .then(() => {
        appController.setIsEditMode(false);
      });
  }

  return (
    <>
      <CategoriesListContainer />

      <Dialog
        className="popup"
        header="New category"
        visible={isPopupOpen}
        onHide={hidePopup}
      >
        <CategoriesSelectedContainer mode="create" />
      </Dialog>
    </>
  );

}
