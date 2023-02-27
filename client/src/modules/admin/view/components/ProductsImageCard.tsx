import { Button } from 'primereact/button';

import type { ProductSchema } from 'shared/types';

import { ProductsImage } from 'view/components/ProductsImage';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';

export type Props = {
  product: ProductSchema;
}

export function ProductsImageCard({ product }: Props) {

  return (
    <CardWrapper>
      <CardHeading heading="Image" />

      <div className="">
        <div className="mb-4">
          <ProductsImage
            className="admin"
            image={product.image}
            size="xlarge"
          />
        </div>

        <div>
          <Button
            className="w-full"
            label="Change image"
          />
        </div>
      </div>
    </CardWrapper>
  );

}
