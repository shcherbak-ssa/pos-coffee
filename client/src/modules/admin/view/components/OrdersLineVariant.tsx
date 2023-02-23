import type { OrderLineVariantSchema } from 'shared/types';

import { ProductsImage } from '@admin/view/components/ProductsImage';

export type Props = {
  variant: OrderLineVariantSchema;
}

export function OrdersLineVariant({ variant }: Props) {

  return (
    <div className="flex items-center gap-4">
      <ProductsImage
        className="shrink-0"
        image={variant.image}
      />

      <div>
        <div>{ variant.productName },</div>
        <div>{ variant.variantName }</div>
      </div>
    </div>
  );

}
