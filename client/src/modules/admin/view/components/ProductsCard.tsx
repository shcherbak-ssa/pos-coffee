import type { EntityComponentProps, ProductSchema } from 'shared/types';
import { ProductsImage } from 'view/components/ProductsImage';

import { CardWrapper } from 'view/components/CardWrapper';
import { CategoryLabel } from './CategoryLabel';

export function ProductsCard({ entity: product, className }: EntityComponentProps<ProductSchema>) {

  return (
    <CardWrapper className={className}>
      <div className="flex-center flex-col text-center full">
        <ProductsImage
          className="admin mb-6"
          image={product.image}
          size="xlarge"
        />

        <h3 className="mb-3">{ product.name }</h3>

        <CategoryLabel category={product.category} />
      </div>
    </CardWrapper>
  );

}
