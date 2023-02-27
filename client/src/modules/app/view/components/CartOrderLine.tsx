import type { MouseEvent } from 'react';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { ProductsImage } from 'view/components/ProductsImage';

import type { CartOrderLineSchema } from '@app/shared/types';

export type Props = {
  line: CartOrderLineSchema;
  addLine: (line: CartOrderLineSchema) => void;
  subtractLine: (line: CartOrderLineSchema) => void;
}

export function CartOrderLine({ line, addLine, subtractLine }: Props) {

  function getLineName(): string {
    return line.variant
      ? `${line.product.name}, ${line.variant.name}`
      : line.product.name;
  }

  function handleAdd(e: MouseEvent): void {
    e.preventDefault();

    addLine(line);
  }

  function handleSubtract(e: MouseEvent): void {
    e.preventDefault();

    subtractLine(line);
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <ProductsImage image={line.product.image} />

        <div className="ml-2 text-sm">
          <h3>{ getLineName() }</h3>
          <div>{ line.price }</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="p-button-sm p-button-rounded p-button-outlined"
          icon={PrimeIcons.MINUS}
          onClick={handleSubtract}
        />

        <div className="w-6 text-center">{ line.count }</div>

        <Button
          className="p-button-sm p-button-rounded p-button-outlined"
          icon={PrimeIcons.PLUS}
          onClick={handleAdd}
        />
      </div>
    </div>
  );

}
