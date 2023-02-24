import { useEffect, useState, type MouseEvent } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { PrimeIcons } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';

import type { ProductSchema, ProductVariantSchema } from 'shared/types';
import { EntityName, ErrorType, LONG_MINUS, ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useError } from 'view/hooks/error';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';
import { BaseCheckbox } from 'view/components/BaseCheckbox';
import { InputWrapper } from 'view/components/InputWrapper';

import type {
  CardWithInputsProps,
  ProductDraft,
  ProductVariantsController,
  ProductVariantsStore,
} from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { confirmDialogConfig } from '@admin/shared/configs/confirm-dialog';
import { ProductsVariantsPopupFooter } from '@admin/view/components/ProductsVariantsPopupFooter';
import { ProductsVariantsPopup } from '@admin/view/components/ProductsVariantsPopup';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';
import { ProductVariantMenu } from '@admin/view/components/ProductVariantMenu';

export type Props = CardWithInputsProps<ProductSchema, ProductDraft>;

export function ProductsVariantsContainer({
  entity: product,
  entityDraft: productDraft,
  validationError: productValidationError,
  isEditMode: isProductEditMode,
}: Props) {

  const [ isVariantsLoaded, setIsVariantsLoaded ] = useState<boolean>(false);
  const [ isPopupVisible, setIsPopupVisible ] = useState<boolean>(false);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const {
    state: { list: variants, selected: selectedVariant },
    draft: variantDraft,
  } = useStore(StoreName.PRODUCT_VARIANTS) as ProductVariantsStore;

  const variantsController = useController(ControllerName.PRODUCT_VARIANTS) as ProductVariantsController;
  const [ validationError, cleanValidationError ]
    = useError<ProductVariantSchema>(ErrorType.VALIDATION, EntityName.PRODUCT_VARIANT);

  useEffect(() => {
    variantsController.loadAll(product.id)
      .then((success) => {
        if (success) {
          setIsVariantsLoaded(true);
        }
      });
  }, []);

  useEffect(() => {
    cleanValidationError();
  }, [isEditMode]);

  function getMenuItems(variant: ProductVariantSchema): MenuItem[] {
    return [
      {
        label: 'View',
        icon: PrimeIcons.EYE,
        command: () => {
          selectVariant(variant.id, false);
        },
      },
      {
        label: 'Edit',
        icon: PrimeIcons.PENCIL,
        command: () => {
          selectVariant(variant.id, true);
        },
      },
      {
        label: 'Delete',
        icon: PrimeIcons.TRASH,
        command: () => {
          confirmDialog({
            ...confirmDialogConfig.delete,
            message: `Are you sure you want to delete this variant?`,
            accept: () => {
              variantsController.delete(variant.id);
            },
          });
        },
      },
    ];
  }

  function selectVariant(id: number, toEdit: boolean): void {
    variantsController.select(id)
      .then(() => {
        setIsPopupVisible(true);
        setIsEditMode(toEdit);
      });
  }

  function saveVariant(): void {
    setIsSaveProcessing(true);

    variantsController.save(product.id)
      .then((id) => {
        if (id) {
          setIsEditMode(false);
        }

        setIsSaveProcessing(false);
      });
  }

  function startEdit(): void {
    setIsEditMode(true);
  }

  function openPopupToCreateVariant(e: MouseEvent): void {
    e.preventDefault();

    selectVariant(ZERO, true);
  }

  function hidePopup(): void {
    if (isSaveProcessing) {
      return;
    }

    setIsPopupVisible(false);
    setIsEditMode(false);
  }

  if (isVariantsLoaded) {
    return (
      <>
        <CardWrapper className="col-span-3">
          <div className="mb-10 flex items-center justify-between">
            <CardHeading
              className="mb-0"
              heading="Variants"
            />

            <Button
              className="p-button-rounded"
              icon={PrimeIcons.PLUS}
              onClick={openPopupToCreateVariant}
            />
          </div>

          <BaseCheckbox
            className="mb-10"
            inputId="useStockForVariants"
            label="Use stock for variants"
            disabled={!isProductEditMode}
            checked={product.useStockForVariants}
            onChange={(e) => productDraft.useStockForVariants = e.checked || false}
          />

          <div className="grid grid-cols-3 mb-10">
            <InputWrapper
              label="Stock"
              valueKey="stock"
              validationError={productValidationError}
            >
              <InputNumber
                id="stock"
                disabled={!isProductEditMode}
                value={product.stock}
                onValueChange={(e) => productDraft.stock = Number(e.value)}
              />
            </InputWrapper>
          </div>


          <div className="overflow-hidden rounded-xl border-2">
            <DataTable
              dataKey="id"
              value={variants}
              responsiveLayout="scroll"
            >
              <Column header="Name" field="name" />
              <Column header="Sku" field="sku" />

              <Column
                header="Price"
                field="price"
                body={({ price, useProductPrice }: ProductVariantSchema) => (
                  <div>{ useProductPrice ? LONG_MINUS : price }</div>
                )}
              />

              <Column
                header="Stock"
                field="stock"
                body={({ stock }: ProductVariantSchema) => (
                  <div>{ product.useStockForVariants ? LONG_MINUS : stock }</div>
                )}
              />

              <Column
                header="Actions"
                field="actions"
                body={(variant: ProductVariantSchema) => (
                  <ProductVariantMenu items={getMenuItems(variant)} />
                )}
              />
            </DataTable>
          </div>
        </CardWrapper>

        <ProductsVariantsPopup
          entity={selectedVariant}
          entityDraft={variantDraft}
          validationError={validationError}
          isEditMode={isEditMode}
          product={product}
          isVisible={isPopupVisible}
          hide={hidePopup}
          footer={(
            <ProductsVariantsPopupFooter
              isEditMode={isEditMode}
              isLoading={isSaveProcessing}
              hide={hidePopup}
              save={saveVariant}
              edit={startEdit}
            />
          )}
        />
      </>
    );
  }

  return <AppLoader />;

}
