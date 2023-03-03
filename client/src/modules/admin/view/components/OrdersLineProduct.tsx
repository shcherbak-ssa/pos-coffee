import type { MouseEvent } from 'react';
import type { OrderLineSchema } from 'shared/types';

import { ProductsImage } from 'view/components/ProductsImage';

export type Props = {
  line: OrderLineSchema;
  toInfoPage: (id: number) => void;
}

export function OrdersLineProduct({ line, toInfoPage }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    toInfoPage(line.productId);
  }

  function renderVariantName(): React.ReactNode {
    if (line.variantName) {
      return <span>, { line.variantName }</span>;
    }
  }

  return (
    <div className="flex items-center gap-4">
      <ProductsImage
        className="shrink-0"
        image={line.image}
      />

      <div className="hover:underline click" onClick={handleClick}>
        <span>{ line.productName }</span>

        { renderVariantName() }
      </div>
    </div>
  );

}
