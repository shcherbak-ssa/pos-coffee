import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { Button } from 'primereact/button';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { PrimeIcons } from 'primereact/api';

import type { ProductVariantSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CartController, CartProductSchema, CartStockAlert, CartStore } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';

export type Props = {
  product: CartProductSchema;
}

const TO_DROPDOWN_LIMIT: number = 3;

export function CartProductItemVariantsContainer({ product }: Props) {

  const { getStockAlert } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  const stockAlert: CartStockAlert = getStockAlert();

  function addVariantToCart(e: MouseEvent, variant: ProductVariantSchema): void {
    e.preventDefault();

    cartController.addOrderLine({ product, variant });
  }

  function selectVariant(e: DropdownChangeEvent): void {
    cartController.addOrderLine({ product, variant: e.value });
  }

  if (product.variants.length <= TO_DROPDOWN_LIMIT) {
    return (
      <div className="flex justify-center gap-4">
        {
          product.variants.map((variant) => {
            const remainStock: number = stockAlert.remainStock({ product, variant });

            return (
              <div className="flex flex-col items-center" key={variant.id}>
                <Button
                  className="p-button-sm p-button-rounded"
                  icon={PrimeIcons.BOX}
                  disabled={!remainStock}
                  onClick={(e) => addVariantToCart(e, variant)}
                />

                <div className="text-xs text-center mt-1">
                  { variant.name }
                </div>
              </div>
            );
          })
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
      itemTemplate={(variant) => {
        const remainStock: number = stockAlert.remainStock({ product, variant });

        return (
          <div
            className={classnames('flex items-center justify-between relative', {
              'opacity-60': remainStock === ZERO,
            })}
          >
            <div>{ variant.name }</div>
            <div>{ variant.price || product.price }</div>
          </div>
        );
      }}
    />
  );
}
