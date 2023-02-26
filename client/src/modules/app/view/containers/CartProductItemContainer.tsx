import { Button } from 'primereact/button';

import { ProductsImage } from 'view/components/ProductsImage';

import type { MenuProduct } from '@app/shared/types';
import { CartProductItemVariantsContainer } from '@app/view/containers/CartProductItemVariantsContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';

export type Props = {
  product: MenuProduct;
}

export function CartProductItemContainer({ product }: Props) {

  function renderAddButtons(): React.ReactNode {
    if (product.variants.length) {
      return <CartProductItemVariantsContainer variants={product.variants} />;
    }

    return (
      <Button
        className="p-button-sm w-full"
        label="Add to cart"
      />
    );
  }

  return (
    <CardWrapper className="flex flex-col justify-between relative">
      <div>
        <ProductsImage
          className="app"
          image={product.image}
          size="xlarge"
        />

        <h3 className="flex items-center justify-between mt-2 font-semibold tracking-wide">
          <span>{ product.name }</span>
          <span>{ product.price }</span>
        </h3>
      </div>

      <div className="mt-4">
        { renderAddButtons() }
      </div>
    </CardWrapper>
  );

}
