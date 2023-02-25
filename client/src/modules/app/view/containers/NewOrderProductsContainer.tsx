import { useEffect, useState } from 'react';

import { useStore } from 'view/hooks/store';

import type { MenuProduct, MenuStore } from '@app/shared/types';
import { StoreName } from '@app/shared/constants';
import { ProductMenuContainer } from '@app/view/containers/ProductMenuContainer';
import { ZERO } from 'shared/constants';

export function NewOrderProductsContainer() {

  const { state: { activeCategoryId, products } } = useStore(StoreName.MENU) as MenuStore;
  const [ currentProducts, setCurrentProducts ] = useState<MenuProduct[]>([]);

  useEffect(() => {
    setCurrentProducts(filterProductsByCategory());
  }, [activeCategoryId]);

  function filterProductsByCategory(): MenuProduct[] {
    return activeCategoryId === ZERO
      ? products
      : products.filter(({ category }) => category.id === activeCategoryId);
  }

  return (
    <div className="grid grid-cols-3 gap-4 py-2">
      {
        currentProducts.map((product) => (
          <ProductMenuContainer
            key={product.id}
            product={product}
          />
        ))
      }
    </div>
  );

}
