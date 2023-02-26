import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { ProductVariantSchema } from 'shared/types';

export type Props = {
  variants: ProductVariantSchema[];
}

export function CartProductItemVariantsContainer({ variants }: Props) {

  return (
    <div className="flex justify-center gap-4">
      {
        variants.map(({ name }) => (
          <div className="flex flex-col items-center">
            <Button
              className="p-button-sm p-button-rounded"
              icon={PrimeIcons.BOX}
            />

            <div className="text-xs text-center mt-1">
              { name }
            </div>
          </div>
        ))
      }
    </div>
  );
}
