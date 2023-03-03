import { ZERO } from 'shared/constants';

import type { CartOrderLineSchema } from '@app/shared/types';
import { ONE_HUNDRED_PERCENT } from '@app/shared/constants';

type Subtotal = number;
type Taxes = number;

export function calculateTotal(lines: CartOrderLineSchema[], taxes: number): [ Subtotal, Taxes ] {
  const linesTotal: number = getLinesTotal(lines);

  return [ linesTotal, round(linesTotal * taxes / ONE_HUNDRED_PERCENT) ];
}

function getLinesTotal(lines: CartOrderLineSchema[]): number {
  return lines.reduce((total, { price, count }) => total + (price * count), ZERO);
}

function round(num: number): number {
  return Math.round(num * ONE_HUNDRED_PERCENT) / ONE_HUNDRED_PERCENT;
}
