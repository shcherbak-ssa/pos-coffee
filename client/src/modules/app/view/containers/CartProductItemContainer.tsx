import type { MouseEvent } from 'react';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { ProductsImage } from 'view/components/ProductsImage';

import type { CartController, CartProductSchema, CartStockAlert, CartStockAlertMessage, CartStore } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';
import { CartProductItemVariantsContainer } from '@app/view/containers/CartProductItemVariantsContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';
import type { ProductVariantSchema } from 'shared/types';

export type Props = {
  product: CartProductSchema;
}

export function CartProductItemContainer({ product }: Props) {

  const { getStockAlert } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  function addProductToCart(e: MouseEvent): void {
    e.preventDefault();

    cartController.addOrderLine({ product });
  }

  function getStockAlertMessage(variant?: ProductVariantSchema): React.ReactNode {
    const stockAlert: CartStockAlert = getStockAlert();
    const alertMessage: CartStockAlertMessage | undefined = stockAlert.getStockAlertMessage({ product, variant });

    if (alertMessage) {
      return (
        <Message
          key={variant?.id}
          severity={alertMessage.type}
          text={alertMessage.message}
        />
      );
    }
  }

  function renderStockAlertMessages(): React.ReactNode {
    if (product.variants.length) {
      return product.variants.map(getStockAlertMessage);
    }

    return getStockAlertMessage();
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

      <div className="flex flex-col gap-2">
        { renderStockAlertMessages() }
      </div>

      <div className="mt-4">
        { renderAddButtons() }
      </div>
    </CardWrapper>
  );

}
