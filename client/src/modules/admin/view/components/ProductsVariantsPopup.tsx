import type { ChangeEvent } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import type { EmptyFunction, ProductVariantSchema } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { InputWrapper } from 'view/components/InputWrapper';

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

  function getNumberFiledValue(field: number | null): string {
    return field === null ? EMPTY_STRING : field.toString();
  }

  function getNumberFieldValueFromInput(e: ChangeEvent<HTMLInputElement>): number | null {
    return e.target.value.trim() === EMPTY_STRING ? null : Number(e.target.value);
  }

  return (
    <Dialog
      className="popup"
      header={variant.name || 'Variant'}
      visible={isVisible}
      onHide={hide}
      footer={footer}
    >
      <div className="py-6">
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

          <div></div>

          <InputWrapper
            label="Stock"
            valueKey="stock"
            validationError={validationError}
          >
            <InputText
              id="stock"
              disabled={!isEditMode}
              value={getNumberFiledValue(variant.stock)}
              onChange={(e) => variantDraft.stock = getNumberFieldValueFromInput(e)}
            />
          </InputWrapper>

          <InputWrapper
            label="Stock alert"
            valueKey="stockAlert"
            validationError={validationError}
          >
            <InputText
              id="stockAlert"
              disabled={!isEditMode}
              value={getNumberFiledValue(variant.stockAlert)}
              onChange={(e) => variantDraft.stockAlert = getNumberFieldValueFromInput(e)}
            />
          </InputWrapper>

          <InputWrapper
            label="Stock per time"
            valueKey="stockPerTime"
            validationError={validationError}
          >
            <InputText
              id="stockPerTime"
              disabled={!isEditMode}
              value={getNumberFiledValue(variant.stockPerTime)}
              onChange={(e) => variantDraft.stockPerTime = getNumberFieldValueFromInput(e)}
            />
          </InputWrapper>
        </div>
      </div>
    </Dialog>
  );

}
