import { InputNumber } from 'primereact/inputnumber';

import type { ProductSchema } from 'shared/types';
import { InputWrapper } from 'view/components/InputWrapper';
import { CardHeading } from 'view/components/CardHeading';

import type { CardWithInputsProps, ProductDraft } from '@admin/shared/types';
import { CardWrapper } from 'view/components/CardWrapper';

export type Props = CardWithInputsProps<ProductSchema, ProductDraft>;

export function ProductsStockCard({
  entity: product,
  entityDraft: productDraft,
  validationError,
  isEditMode,
}: Props) {

  return (
    <CardWrapper className="col-span-3">
      <CardHeading heading="Stock" />

      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        <InputWrapper
          label="Stock"
          valueKey="stock"
          validationError={validationError}
        >
          <InputNumber
            id="stock"
            disabled={!isEditMode}
            value={product.stock}
            onValueChange={(e) => productDraft.stock = Number(e.value)}
          />
        </InputWrapper>

        <InputWrapper
          label="Stock alert"
          valueKey="stockAlert"
          validationError={validationError}
        >
          <InputNumber
            id="stockAlert"
            disabled={!isEditMode}
            value={product.stockAlert}
            onValueChange={(e) => productDraft.stockAlert = Number(e.value)}
          />
        </InputWrapper>

        <InputWrapper
          label="Stock per time"
          valueKey="stockPerTime"
          validationError={validationError}
        >
          <InputNumber
            id="stock"
            disabled={!isEditMode}
            value={product.stockPerTime}
            onValueChange={(e) => productDraft.stockPerTime = Number(e.value)}
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  );

}
