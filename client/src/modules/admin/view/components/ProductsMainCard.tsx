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
import { BaseCheckbox } from 'view/components/BaseCheckbox';

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

  return (
    <CardWrapper className="col-span-2">
      <CardHeading heading="Main" />

      <AvailableCheckbox
        className="mb-10"
        entityName={EntityName.PRODUCT}
        isEditMode={isEditMode}
        checked={product.isAvailable}
        change={(isAvailable: boolean) => productDraft.isAvailable = isAvailable}
      />

      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
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

        <BaseCheckbox
          inputId="useStockForVariants"
          label="Use stock for variants"
          disabled={!isEditMode}
          checked={product.useStockForVariants}
          onChange={(e) => productDraft.useStockForVariants = e.checked || false}
        />

        <div></div>

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
      </div>
    </CardWrapper>
  );

}