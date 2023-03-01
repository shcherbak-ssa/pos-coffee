import type { ProductSchema, ProductVariantSchema } from 'shared/types';
import { LONG_MINUS } from 'shared/constants';

export type Props = {
  price: number | null;
}

export function ProductsPrice({ price }: Props) {

  return <div>{ price || LONG_MINUS }</div>;

}
