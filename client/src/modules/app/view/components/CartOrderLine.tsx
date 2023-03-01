import type { MouseEvent } from 'react';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { Currency } from 'shared/constants';
import { ProductsImage } from 'view/components/ProductsImage';
import { BasePrice } from 'view/components/BasePrice';

import type { CartOrderLineSchema } from '@app/shared/types';

export type Props = {
  line: CartOrderLineSchema;
  editable: boolean;
  currency: Currency;
  addLine?: (line: CartOrderLineSchema) => void;
  subtractLine?: (line: CartOrderLineSchema) => void;
}

export function CartOrderLine({ line, editable, currency, addLine, subtractLine }: Props) {

  function getLineName(): string {
    return line.variant
      ? `${line.product.name}, ${line.variant.name}`
      : line.product.name;
  }

  function handleAdd(e: MouseEvent): void {
    e.preventDefault();

    if (addLine) {
      addLine(line);
    }
  }

  function handleSubtract(e: MouseEvent): void {
    e.preventDefault();

    if (subtractLine) {
      subtractLine(line);
    }
  }

  function renderEditButtons(): React.ReactNode {
    if (editable) {
      return (
        <div className="flex items-center gap-2">
          <Button
            className="p-button-sm p-button-rounded p-button-outlined"
            icon={PrimeIcons.MINUS}
            onClick={handleSubtract}
          />

          <div className="w-6 text-center font-semibold">{ line.count }</div>

          <Button
            className="p-button-sm p-button-rounded p-button-outlined"
            icon={PrimeIcons.PLUS}
            onClick={handleAdd}
          />
        </div>
      );
    }
  }

  function renderTotal(): React.ReactNode {
    if (!editable) {
      return (
        <strong className="text-right text-sm">
          <div>{ line.count }</div>

          <BasePrice
            price={line.count * line.price}
            currency={currency}
            useSymbol
          />
        </strong>
      );
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <ProductsImage image={line.product.image} />

        <div className="ml-2 text-sm">
          <h3>{ getLineName() }</h3>

          <BasePrice
            price={line.price}
            currency={currency}
          />
        </div>
      </div>

      { renderEditButtons() }

      { renderTotal() }
    </div>
  );

}
