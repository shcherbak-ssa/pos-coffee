import type { OrderLineSchema } from 'shared/types';

import { ProductsImage } from 'view/components/ProductsImage';

export type Props = {
  line: OrderLineSchema;
}

export function OrdersLineProduct({ line }: Props) {

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

      <div>
        <span>{ line.productName }</span>

        { renderVariantName() }
      </div>
    </div>
  );

}
