import type { EntityComponentProps, UserSchema } from 'shared/types';
import { ProductsImage } from 'view/components/ProductsImage';

import { CardWrapper } from '@admin/view/components/CardWrapper';

export function ProductsCard({ entity: product, className }: EntityComponentProps<UserSchema>) {

  return (
    <CardWrapper className={className}>
      <div className="flex-center flex-col text-center full">
        <ProductsImage
          className="admin mb-6"
          image={product.image}
          size="xlarge"
        />

        <h3 className="mb-3">{ product.name }</h3>
      </div>
    </CardWrapper>
  );

}
