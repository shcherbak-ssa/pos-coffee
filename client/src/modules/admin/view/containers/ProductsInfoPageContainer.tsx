import type { ProductSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { ProductsStore } from '@admin/shared/types';
import { PagePath, PageTitle, StoreName, ControllerName } from '@admin/shared/constants';
import { actionsMenuItemsProps, headerMenuItems, pages } from '@admin/shared/configs/pages';
import { type Return, useInfoPageContainer } from '@admin/view/hooks/info-page-container';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { ProductsInfoWrapper } from '@admin/view/components/ProductsInfoWrapper';
import { ProductsMainCard } from '@admin/view/components/ProductsMainCard';

export type Props = {
  isEditMode: boolean;
}

export function ProductsInfoPageContainer({ isEditMode }: Props) {

  const { state: { selected: selectedProduct }, draft: draftProduct } = useStore(StoreName.PRODUCTS) as ProductsStore;

  const [ pageLayoutProps, validationError ]: Return<ProductSchema> = useInfoPageContainer({
    page: {
      ...pages[PageTitle.PRODUCTS],
      to: PagePath.PRODUCTS,
      child: { title: selectedProduct.name },
      headerMenuItem: headerMenuItems.products,
    },
    storeName: StoreName.PRODUCTS,
    controllerName: ControllerName.PRODUCTS,
    infoPagePath: PagePath.PRODUCTS_INFO,
    actionsMenuItemsProps: actionsMenuItemsProps.products,
    errorMessage: 'Product not found',
    isEditMode,
  });

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <ProductsInfoWrapper>
          <ProductsMainCard
            entity={selectedProduct}
            entityDraft={draftProduct}
            validationError={validationError}
            isEditMode={isEditMode}
          />
        </ProductsInfoWrapper>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
