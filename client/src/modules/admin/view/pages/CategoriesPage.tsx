import { EntityName } from 'shared/constants';
import { useController } from 'view/hooks/controller';
import { loadContext } from 'view/helpers/load-context';

import type { AppController, CategoriesController } from '@admin/shared/types';
import { ControllerName, PageTitle, StoreName } from '@admin/shared/constants';
import { pages, headerMenuItems } from '@admin/shared/configs/pages';
import { pageContainer } from '@admin/view/helpers/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { CategoriesPageContainer } from '@admin/view/containers/CategoriesPageContainer';

const CategoriesPage = loadContext(Page, {
  stores: [ StoreName.CATEGORIES ],
  controllers: [ ControllerName.CATEGORIES ],
});

const PageContainer = pageContainer(CategoriesPageContainer, {
  entityName: EntityName.CATEGORY,
  storeName: StoreName.CATEGORIES,
  controllerName: ControllerName.CATEGORIES,
});

export default CategoriesPage;

function Page() {

  const appController = useController(ControllerName.APP) as AppController;
  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  const pageLayoutProps: Omit<PageLayoutProps, 'children'> = {
    showSubHeader: false,
    showTabs: false,
    page: {
      ...pages[PageTitle.CATEGORIES],
      headerMenuItem: headerMenuItems.categories,
    },
    addButton: {
      label: 'Create new category',
      command: () => {
        categoriesController.setIsPopupOpen(true)
          .then(() => {
            appController.setIsEditMode(true);
          });
      },
    },
  };

  return (
    <PageLayout {...pageLayoutProps}>
      <PageContainer />
    </PageLayout>
  );

}
