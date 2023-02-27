import { Tag  } from 'primereact/tag';

import type { ProductSchema, ProductVariantSchema, ViewSeverity } from 'shared/types';
import { DOUBLE_STOCK_ALERT, LONG_MINUS } from 'shared/constants';

export type Props = {
  product: ProductSchema;
  variant: ProductVariantSchema;
}

export function ProductsStockLabel({ product, variant }: Props) {

  function getSeverity(): ViewSeverity {
    if (variant.stock <= variant.stockAlert) {
      return 'danger';
    }

    if (variant.stock / DOUBLE_STOCK_ALERT <= variant.stockAlert) {
      return 'warning';
    }

    return 'success';
  }

  if (product.useStockForVariants) {
    return <div>{ LONG_MINUS }</div>;
  }

  return (
    <Tag severity={getSeverity()} value={variant.stock} />
  );

}
