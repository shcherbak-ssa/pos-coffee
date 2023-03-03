import type { EntityComponentProps, ProductSchema } from 'shared/types';
import { ProductsImage } from 'view/components/ProductsImage';
import { CardWrapper } from 'view/components/CardWrapper';

import { CategoryLabel } from '@admin/view/components/CategoryLabel';

export type Props = EntityComponentProps<ProductSchema> & {
  isSearchResult?: boolean;
};

export function ProductsCard({ entity: product, className, isSearchResult = false }: Props) {

  return (
    <CardWrapper className={className}>
      <div className="flex-center flex-col text-center full">
        <ProductsImage
          className={'mb-6 ' + (isSearchResult ? 'search' : 'admin')}
          image={product.image}
          size="xlarge"
        />

        <h3 className="mb-3">{ product.name }</h3>

        <CategoryLabel category={product.category} />
      </div>
    </CardWrapper>
  );

}
