import type { MouseEvent } from 'react';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { PrimeIcons } from 'primereact/api';

import type { ProductVariantSchema } from 'shared/types';
import { useController } from 'view/hooks/controller';

import type { CartController, CartProductSchema } from '@app/shared/types';
import { ControllerName } from '@app/shared/constants';

export type Props = {
  product: CartProductSchema;
}

const TO_DROPDOWN_LIMIT: number = 3;

export function CartProductItemVariantsContainer({ product }: Props) {

  const cartController = useController(ControllerName.CART) as CartController;

  function addVariantToCart(e: MouseEvent, variant: ProductVariantSchema): void {
    e.preventDefault();

    cartController.addOrderLine(product, variant);
  }

  function selectVariant(e: DropdownChangeEvent): void {
    cartController.addOrderLine(product, e.value);
  }

  if (product.variants.length <= TO_DROPDOWN_LIMIT) {
    return (
      <div className="flex justify-center gap-4">
        {
          product.variants.map((variant) => (
            <div className="flex flex-col items-center" key={variant.id}>
              <Button
                className="p-button-sm p-button-rounded"
                icon={PrimeIcons.BOX}
                onClick={(e) => addVariantToCart(e, variant)}
              />

              <div className="text-xs text-center mt-1">
                { variant.name }
              </div>
            </div>
          ))
        }
      </div>
    );
  }

  return (
    <Dropdown
      className="w-full"
      placeholder="Variants"
      options={product.variants}
      optionLabel="name"
      onChange={selectVariant}
    />
  );
}
