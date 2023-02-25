import type { MenuProduct } from '@app/shared/types';
import { CardWrapper } from '@app/view/components/CardWrapper';

export type Props = {
  product: MenuProduct;
}

export function ProductMenuContainer({ product }: Props) {

  return (
    <CardWrapper>
      { product.name }
    </CardWrapper>
  );

}
