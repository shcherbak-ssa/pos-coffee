import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

import type { EmptyFunction, ProductVariantSchema } from 'shared/types';
import { InputWrapper } from 'view/components/InputWrapper';
import { BaseCheckbox } from 'view/components/BaseCheckbox';

import type { CardWithInputsProps, ProductVariantDraft } from '@admin/shared/types';

export type Props = CardWithInputsProps<ProductVariantSchema, ProductVariantDraft> & {
  isVisible: boolean;
  hide: EmptyFunction;
  footer: React.ReactNode;
}

export function ProductsVariantsPopup({
  entity: variant,
  entityDraft: variantDraft,
  validationError,
  isEditMode,
  isVisible,
  hide,
  footer,
}: Props) {

  function drawPriceInput(): React.ReactNode {
    if (variant.useProductPrice) {
      return;
    }

    return (
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
          value={variant.price}
          onValueChange={(e) => variantDraft.price = Number(e.value)}
        />
      </InputWrapper>
    );
  }

  return (
    <Dialog
      className="products-variants-popup"
      header={variant.name || 'Variant'}
      visible={isVisible}
      onHide={hide}
      footer={footer}
    >
      <div className="py-6">
        <BaseCheckbox
          inputId="useProductPrice"
          label="Use product price"
          disabled={!isEditMode}
          checked={variant.useProductPrice}
          onChange={(e) => variantDraft.useProductPrice = e.checked || false}
        />

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 pt-10">
          <InputWrapper
            label="Name"
            valueKey="name"
            validationError={validationError}
          >
            <InputText
              id="name"
              type="text"
              disabled={!isEditMode}
              value={variant.name}
              onChange={(e) => variantDraft.name = e.target.value}
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
              value={variant.sku}
              onChange={(e) => variantDraft.sku = e.target.value.toUpperCase()}
            />
          </InputWrapper>

          { drawPriceInput() }
        </div>
      </div>
    </Dialog>
  );

}
