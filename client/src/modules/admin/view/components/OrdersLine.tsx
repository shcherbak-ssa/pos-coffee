import type { OrderLineSchema } from 'shared/types';

import { ProductsImage } from 'view/components/ProductsImage';

export type Props = {
  line: OrderLineSchema;
}

export function OrdersLine({ line }: Props) {

  function renderVariantName(): React.ReactNode {
    if (line.variantName) {
      return <div>{ line.variantName }</div>;
    }
  }

  return (
    <div className="flex items-center gap-4">
      <ProductsImage
        className="shrink-0"
        image={line.image}
      />

      <div>
        <div>{ line.productName },</div>

        { renderVariantName() }
      </div>
    </div>
  );

}
