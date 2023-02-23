import { Button } from 'primereact/button';

import type { ProductSchema } from 'shared/types';

import { ProductsImage } from '@admin/view/components/ProductsImage';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';

export type Props = {
  product: ProductSchema;
}

export function ProductsImageCard({ product }: Props) {

  function drawProductImage(): React.ReactNode {
    if (product.image) {
      return (
        <img
          className="rounded object-cover w-60 h-60"
          src={product.image}
        />
      );
    }

    return <ProductsImage image="" size="xlarge" />;
  }

  return (
    <CardWrapper>
      <CardHeading heading="Image" />

      <div className="">
        <div className="mb-4">
          { drawProductImage() }
        </div>

        <div>
          <Button label="Change image" />
        </div>
      </div>
    </CardWrapper>
  );

}
