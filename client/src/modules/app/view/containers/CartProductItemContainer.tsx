import type { MouseEvent } from 'react';
import { Button } from 'primereact/button';

import { ZERO } from 'shared/constants';
import { useController } from 'view/hooks/controller';
import { ProductsImage } from 'view/components/ProductsImage';

import type { CartController, CartProductSchema } from '@app/shared/types';
import { ControllerName, PRODUCT_COUNT_STEP } from '@app/shared/constants';
import { CartProductItemVariantsContainer } from '@app/view/containers/CartProductItemVariantsContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';

export type Props = {
  product: CartProductSchema;
}

export function CartProductItemContainer({ product }: Props) {

  const cartController = useController(ControllerName.CART) as CartController;

  function addProductToCart(e: MouseEvent): void {
    e.preventDefault();

    cartController.addOrderLine(product);
  }

  function renderAddButtons(): React.ReactNode {
    if (product.variants.length) {
      return <CartProductItemVariantsContainer product={product} />;
    }

    return (
      <Button
        className="p-button-sm w-full"
        label="Add to cart"
        onClick={addProductToCart}
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
