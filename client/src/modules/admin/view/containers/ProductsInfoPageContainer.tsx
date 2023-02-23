import { useEffect, useState } from 'react';

import type { ProductCategory, ProductSchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { AppController, AppStore, ProductsStore } from '@admin/shared/types';
import { PagePath, PageTitle, StoreName, ControllerName } from '@admin/shared/constants';
import { actionsMenuItemsProps, headerMenuItems, pages } from '@admin/shared/configs/pages';
import { type Return, useInfoPageContainer } from '@admin/view/hooks/info-page-container';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { ProductsInfoWrapper } from '@admin/view/components/ProductsInfoWrapper';
import { ProductsMainCard } from '@admin/view/components/ProductsMainCard';
import { ProductsVariantsContainer } from '@admin/view/containers/ProductsVariantsContainer';
import { ProductsImageCard } from '../components/ProductsImageCard';

export type Props = {
  isEditMode: boolean;
}

export function ProductsInfoPageContainer({ isEditMode }: Props) {

  const { state: { selected: selectedProduct }, draft: draftProduct } = useStore(StoreName.PRODUCTS) as ProductsStore;
  const { state: { productCategories } } = useStore(StoreName.APP) as AppStore;

  const [ selectedProductCategory, setSelectedProductCategory ] = useState<ProductCategory>(productCategories[ZERO]);
  const appController = useController(ControllerName.APP) as AppController;

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
    entityName: EntityName.PRODUCT,
    isEditMode,
  });

  useEffect(() => {
    appController.loadProductCategories();
  }, []);

  useEffect(() => {
    if (selectedProduct.category.id === ZERO) {
      draftProduct.category = productCategories[ZERO];
    }
  }, [productCategories]);

  useEffect(() => {
    setSelectedProductCategory(
      productCategories.find(({ id }) => id === selectedProduct.category.id) || selectedProductCategory
    );
  }, [selectedProduct.category]);

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <ProductsInfoWrapper>
          <ProductsImageCard product={selectedProduct} />

          <ProductsMainCard
            entity={selectedProduct}
            entityDraft={draftProduct}
            validationError={validationError}
            isEditMode={isEditMode}
            productCategories={productCategories}
            selectedProductCategory={selectedProductCategory}
          />

          <ProductsVariantsContainer product={selectedProduct} />
        </ProductsInfoWrapper>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
