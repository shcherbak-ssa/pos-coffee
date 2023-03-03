import { useEffect, useState } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';

import type { CartProductSchema, CartStore } from '@app/shared/types';
import { StoreName } from '@app/shared/constants';
import { CartProductItemContainer } from '@app/view/containers/CartProductItemContainer';

export function CartProductsContainer() {

  const { state: { activeCategoryId, searchString }, products } = useStore(StoreName.CART) as CartStore;
  const [ currentProducts, setCurrentProducts ] = useState<CartProductSchema[]>([]);

  useEffect(() => {
    setCurrentProducts(filterProducts());
  }, [activeCategoryId, searchString]);

  function filterProducts(): CartProductSchema[] {
    const filteredProducts: CartProductSchema[] = activeCategoryId === ZERO
      ? products
      : products.filter(({ category }) => category.id === activeCategoryId);

    return filteredProducts.filter(({ name: productName, variants }) => {
      const regexSearch: RegExp = new RegExp(searchString.toLowerCase(), 'g');

      if (variants.length) {
        for (const { name: variantName } of variants) {
          if (regexSearch.test(variantName.toLowerCase())) {
            return true;
          }
        }
      }

      return regexSearch.test(productName.toLowerCase());
    });
  }

  return (
    <ScrollPanel style={{ width: 'calc(100% + 18px)', height: 'calc(100% - 38px)' }}>
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
    </ScrollPanel>
  );

}
