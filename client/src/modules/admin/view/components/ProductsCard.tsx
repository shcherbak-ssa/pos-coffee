import type { EntityComponentProps, UserSchema } from 'shared/types';

import { CardWrapper } from '@admin/view/components/CardWrapper';
import { ProductsPhoto } from '@admin/view/components/ProductsPhoto';

export function ProductsCard({ entity: product, className }: EntityComponentProps<UserSchema>) {

  return (
    <CardWrapper className={className}>
      <div className="flex-center flex-col text-center full">
        <ProductsPhoto
          className="mb-6"
          photo={product.photo}
          size="xlarge"
        />

        <h3 className="mb-3">{ product.name }</h3>
      </div>
    </CardWrapper>
  );

}
