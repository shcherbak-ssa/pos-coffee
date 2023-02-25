import { EntityName } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';

import { StoreName, ControllerName, PageTitle, PagePath } from '@admin/shared/constants';
import { actionsMenuItemsProps, headerMenuItems, pages } from '@admin/shared/configs/pages';
import { infoPageContainer } from '@admin/view/helpers/info-page-container';
import { type Props as InfoPageLayoutProps, InfoPageLayout } from '@admin/view/layouts/InfoPageLayout';
import { ProductsInfoPageContainer } from '@admin/view/containers/ProductsInfoPageContainer';

export type Props = {
  isEditMode?: boolean;
}

const ProductsInfoPage = loadContext(Page, {
  stores: [
    StoreName.PRODUCTS,
    StoreName.PRODUCT_VARIANTS,
  ],
  controllers: [
    ControllerName.PRODUCTS,
    ControllerName.PRODUCT_VARIANTS,
  ],
});

const InfoPageContainer = infoPageContainer(ProductsInfoPageContainer, {
  controllerName: ControllerName.PRODUCTS,
  entityName: EntityName.PRODUCT,
});

export default ProductsInfoPage;

function Page() {

  const pageLayoutProps: Omit<InfoPageLayoutProps, 'children'> = {
    page: {
      ...pages[PageTitle.PRODUCTS],
      to: PagePath.PRODUCTS,
      headerMenuItem: headerMenuItems.products,
    },
    actionProps: {
      storeName: StoreName.PRODUCTS,
      controllerName: ControllerName.PRODUCTS,
      actionsMenuItemsProps: actionsMenuItemsProps.products,
    },
  };

  return (
    <InfoPageLayout {...pageLayoutProps}>
      <InfoPageContainer />
    </InfoPageLayout>
  );

}
