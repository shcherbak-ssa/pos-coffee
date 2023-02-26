import type { OrderLineSchema } from 'shared/types';

export function isSameOrderLine(line: OrderLineSchema, lineToCompare: OrderLineSchema): boolean {
  return line.productId === lineToCompare.productId
    ? line.variantId === lineToCompare.variantId
    : false;
}
