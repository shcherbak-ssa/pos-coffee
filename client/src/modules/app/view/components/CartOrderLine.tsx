import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import type { MouseEvent } from 'react';
import type { OrderLineSchema } from 'shared/types';
import { ProductsImage } from 'view/components/ProductsImage';

export type Props = {
  line: OrderLineSchema;
  addLine: (line: OrderLineSchema) => void;
  subtractLine: (line: OrderLineSchema) => void;
}

export function CartOrderLine({ line, addLine, subtractLine }: Props) {

  function getLineName(): string {
    return line.variantName
      ? `${line.productName}, ${line.variantName}`
      : line.productName;
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
        <ProductsImage image={line.image} />

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

        <div className="w-2">{ line.count }</div>

        <Button
          className="p-button-sm p-button-rounded p-button-outlined"
          icon={PrimeIcons.PLUS}
          onClick={handleAdd}
        />
      </div>
    </div>
  );

}
