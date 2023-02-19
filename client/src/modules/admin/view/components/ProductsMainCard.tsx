import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import type { ProductSchema } from 'shared/types';
import { InputWrapper } from 'view/components/InputWrapper';

import type { CardWithInputsProps, ProductDraft } from '@admin/shared/types';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';
import { Button } from 'primereact/button';

export type Props = CardWithInputsProps<ProductSchema, ProductDraft>;

export function ProductsMainCard({
  entity: product,
  entityDraft: productDraft,
  validationError,
  isEditMode,
  className,
}: Props) {

  return (
    <CardWrapper>
      <CardHeading heading="Main" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 mb-10">
        <InputWrapper
          label="Name"
          valueKey="name"
          validationError={validationError}
        >
          <InputText
            id="name"
            type="text"
            disabled={!isEditMode}
            value={product.name}
            onChange={(e) => productDraft.name = e.target.value}
          />
        </InputWrapper>

        <InputWrapper
          label="SKU"
          valueKey="sku"
          validationError={validationError}
        >
          <InputText
            id="sku"
            type="text"
            disabled={!isEditMode}
            value={product.sku}
            onChange={(e) => productDraft.sku = e.target.value.toUpperCase()}
          />
        </InputWrapper>

        <InputWrapper
          label="Price"
          valueKey="price"
          validationError={validationError}
        >
          <InputNumber
            id="price"
            mode="currency"
            currency="EUR"
            disabled={!isEditMode}
            value={product.price}
            onValueChange={(e) => productDraft.price = Number(e.value)}
          />
        </InputWrapper>
      </div>

      <CardHeading heading="Image" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
        <img
          className="rounded object-cover w-56 h-56"
          src={product.photo}
        />

        <div>
          <Button label="Change image" />
        </div>
      </div>
    </CardWrapper>
  );

}