import { EntityName } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';

import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { headerMenuItems, pages } from '@admin/shared/configs/pages';
import { pageContainer } from '@admin/view/helpers/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { ProductsPageContainer } from '@admin/view/containers/ProductsPageContainer';

const ProductsPage = loadContext(Page, {
  stores: [ StoreName.PRODUCTS ],
  controllers: [ ControllerName.PRODUCTS ],
});

const PageContainer = pageContainer(ProductsPageContainer, {
  entityName: EntityName.PRODUCT,
  storeName: StoreName.PRODUCTS,
  controllerName: ControllerName.PRODUCTS,
});

export default ProductsPage;

function Page() {

  const pageLayoutProps: Omit<PageLayoutProps, 'children'> = {
    page: {
      ...pages[PageTitle.USERS],
      headerMenuItem: headerMenuItems.products,
    },
    addButton: {
      label: 'Create new product',
      to: PagePath.PRODUCTS_INFO,
    },
  };

  return (
    <PageLayout {...pageLayoutProps}>
      <PageContainer />
    </PageLayout>
  );

}
