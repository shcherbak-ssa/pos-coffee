import { Button } from 'primereact/button';

import type { ProductSchema } from 'shared/types';
import { ProductsImage } from 'view/components/ProductsImage';
import { CardHeading } from 'view/components/CardHeading';

import { CardWrapper } from 'view/components/CardWrapper';

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
