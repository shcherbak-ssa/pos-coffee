import { useEffect, useState } from 'react';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';

import type { CartProduct, CartStore } from '@app/shared/types';
import { StoreName } from '@app/shared/constants';
import { CartProductItemContainer } from '@app/view/containers/CartProductItemContainer';

export function CartProductsContainer() {

  const { state: { activeCategoryId, products } } = useStore(StoreName.CART) as CartStore;
  const [ currentProducts, setCurrentProducts ] = useState<CartProduct[]>([]);

  useEffect(() => {
    setCurrentProducts(filterProductsByCategory());
  }, [activeCategoryId]);

  function filterProductsByCategory(): CartProduct[] {
    return activeCategoryId === ZERO
      ? products
      : products.filter(({ category }) => category.id === activeCategoryId);
  }

  return (
    <div className="grid grid-cols-3 gap-4 px-4 pt-4 pb-4">
      {
        currentProducts.map((product) => (
          <CartProductItemContainer
            key={product.id}
            product={product}
          />
        ))
      }
    </div>
  );

}
