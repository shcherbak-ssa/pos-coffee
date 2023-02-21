import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import type { ProductCategory, ProductSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { InputWrapper } from 'view/components/InputWrapper';

import type { CardWithInputsProps, ProductDraft } from '@admin/shared/types';
import { AvailableCheckbox } from '@admin/view/components/AvailableCheckbox';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';
import { ProductsImage } from '@admin/view/components/ProductsImage';

export type Props = CardWithInputsProps<ProductSchema, ProductDraft> & {
  productCategories: ProductCategory[];
  selectedProductCategory: ProductCategory;
};

export function ProductsMainCard({
  entity: product,
  entityDraft: productDraft,
  validationError,
  isEditMode,
  productCategories,
  selectedProductCategory,
}: Props) {

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
      <CardHeading heading="Main" />

      <div className="flex flex-col gap-10 mb-10">
        <AvailableCheckbox
          className="mb-4"
          entityName={EntityName.PRODUCT}
          isEditMode={isEditMode}
          checked={product.isAvailable}
          change={(isAvailable: boolean) => productDraft.isAvailable = isAvailable}
        />

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

        <InputWrapper
          label="Category"
          valueKey="price"
          validationError={validationError}
        >
          <Dropdown
            inputId="category"
            disabled={!isEditMode}
            value={selectedProductCategory}
            onChange={(e) => productDraft.category = e.value}
            options={productCategories}
            optionLabel="name"
          />
        </InputWrapper>
      </div>

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