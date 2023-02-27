import { type MouseEvent, useRef } from 'react';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { OverlayPanel } from 'primereact/overlaypanel';

import type { MessageType, ProductVariantSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { ProductsImage } from 'view/components/ProductsImage';

import type { CartController, CartProductSchema, CartStockAlert, CartStore } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';
import { CartProductItemVariantsContainer } from '@app/view/containers/CartProductItemVariantsContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';
import { PrimeIcons } from 'primereact/api';

export type Props = {
  product: CartProductSchema;
}

export function CartProductItemContainer({ product }: Props) {

  const stockPanel = useRef<OverlayPanel>(null);

  const { getStockAlert } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  function addProductToCart(e: MouseEvent): void {
    e.preventDefault();

    cartController.addOrderLine({ product });
  }

  function toggleStockPanel(e: MouseEvent): void {
    e.preventDefault();

    if (stockPanel.current) {
      stockPanel.current.toggle(e);
    }
  }

  function getStockAlertMessage(variant?: ProductVariantSchema): React.ReactNode {
    const remainStock: number = getStockAlert().remainStock({ product, variant });
    const stockAlert: number = typeof(variant?.stockAlert) === 'number' ? variant.stockAlert : product.stockAlert;

    if (remainStock > stockAlert) {
      return;
    }

    return (
      <Message
        key={variant?.id || ZERO}
        severity="error"
        text={`${variant ? variant.name : 'Product'} left for ${remainStock} times`}
      />
    );
  }

  function renderStockAlertButton(): React.ReactNode {
    if (renderStockAlertMessages()) {
      return (
        <Button
          className="p-button-rounded p-button-sm p-button-danger absolute -top-2 -right-2"
          icon={PrimeIcons.EXCLAMATION_CIRCLE}
          onClick={toggleStockPanel}
        />
      );
    }
  }

  function renderStockAlertMessages(): React.ReactNode {
    if (product.variants.length) {
      const messages = product.variants.map(getStockAlertMessage);

      return !!messages.filter((message) => message).length
        ? messages
        : undefined;
    }

    return getStockAlertMessage();
  }

  function renderAddButtons(): React.ReactNode {
    if (product.variants.length) {
      return <CartProductItemVariantsContainer product={product} />;
    }

    const stockAlert: CartStockAlert = getStockAlert();
    const remainStock: number = stockAlert.remainStock({ product });

    return (
      <Button
        className="p-button-sm w-full"
        label="Add to cart"
        disabled={!remainStock}
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

      { renderStockAlertButton() }

      <OverlayPanel ref={stockPanel}>
        <div className="flex flex-col gap-2">
          { renderStockAlertMessages() }
        </div>
      </OverlayPanel>
    </CardWrapper>
  );

}
