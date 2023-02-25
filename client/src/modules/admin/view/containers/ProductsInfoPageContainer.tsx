import { useEffect, useState } from 'react';

import type { ErrorObject, ProductCategory, ProductSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppController, AppStore, CardWithInputsProps, ProductDraft, ProductsStore } from '@admin/shared/types';
import { StoreName, ControllerName } from '@admin/shared/constants';
import { ProductsMainCard } from '@admin/view/components/ProductsMainCard';
import { ProductsVariantsContainer } from '@admin/view/containers/ProductsVariantsContainer';
import { ProductsImageCard } from '@admin/view/components/ProductsImageCard';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';

export type Props = {
  validationError?: ErrorObject<ProductSchema>;
}

export function ProductsInfoPageContainer({ validationError }: Props) {

  const { state: { productCategories, isEditMode } } = useStore(StoreName.APP) as AppStore;
  const { state: { selected: selectedProduct }, draft: draftProduct } = useStore(StoreName.PRODUCTS) as ProductsStore;

  const [ selectedProductCategory, setSelectedProductCategory ] = useState<ProductCategory>(productCategories[ZERO]);
  const appController = useController(ControllerName.APP) as AppController;

  const cardProps: CardWithInputsProps<ProductSchema, ProductDraft> = {
    entity: selectedProduct,
    entityDraft: draftProduct,
    validationError,
    isEditMode,
  };

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

  return (
    <InfoPageWrapper className="grid-cols-3">
      <ProductsImageCard product={selectedProduct} />

      <ProductsMainCard
        productCategories={productCategories}
        selectedProductCategory={selectedProductCategory}
        {...cardProps}
      />

      <ProductsVariantsContainer {...cardProps} />
    </InfoPageWrapper>
  );

}
