import { Tag  } from 'primereact/tag';

import type { ViewSeverity } from 'shared/types';
import { DOUBLE_STOCK_ALERT, LONG_MINUS } from 'shared/constants';

export type Props = {
  stock: number | null;
  stockAlert: number | null;
}

export function ProductsStockLabel({ stock, stockAlert }: Props) {

  function getSeverity(): ViewSeverity {
    if (stock === null || stockAlert === null) {
      return;
    }

    if (stock <= stockAlert) {
      return 'danger';
    }

    if (stock / DOUBLE_STOCK_ALERT <= stockAlert) {
      return 'warning';
    }

    return 'success';
  }

  if (stock === null) {
    return <div>{ LONG_MINUS }</div>;
  }

  return (
    <Tag severity={getSeverity()} value={stock} />
  );

}
