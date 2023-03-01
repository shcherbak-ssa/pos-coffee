import { type MouseEvent, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

import type { EmptyFunction, PaymentMethod } from 'shared/types';
import { ZERO } from 'shared/constants';
import { paymentMethods } from 'shared/configs/payment-methods';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { BasePrice } from 'view/components/BasePrice';

import type { CartStore, CartController, AppStore } from '@app/shared/types';
import { ControllerName, ONE_HUNDRED_PERCENT, StoreName } from '@app/shared/constants';
import { CardListWrapper } from '@app/view/components/CardListWrapper';
import { CartOrderLine } from '@app/view/components/CartOrderLine';
import { CartPaymentMethod } from '@app/view/components/CartPaymentMethod';
import { CartOrderSum } from '../components/CartOrderSum';
import { calculateTotal } from '@app/shared/helpers/calculate-total';

export type Props = {
  isOpen: boolean;
  hide: EmptyFunction;
}

export function CartPaymentPopupContainer({ isOpen, hide }: Props) {

  const { state: { settings } } = useStore(StoreName.APP) as AppStore;
  const { state: { order } } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  const [ isPaymentProcessing, setIsPaymentProcessing ] = useState<boolean>(false);
  const [ selectedPaymentMethod, setSelectedPaymentMethod ] = useState<PaymentMethod>();

  function getTotal(): number {
    const [ subtotal, taxes ] = calculateTotal(order.lines, settings.taxes);

    return taxes === ZERO ? subtotal : subtotal + taxes;
  }

  function processPayment(e: MouseEvent): void {
    e.preventDefault();

    setIsPaymentProcessing(true);

    cartController.createOrder()
      .then((success) => {
        if (success) {
          handleHide();
        }
      });
  }

  function selectPaymentMethod(e: SelectButtonChangeEvent): void {
    setSelectedPaymentMethod(e.value);

    if (e.value) {
      cartController.setOrderPaymentMethod(e.value.type);
    }
  }

  function handleHide(): void {
    setSelectedPaymentMethod(undefined);
    setIsPaymentProcessing(false);

    hide();
  }

  function renderSubtotalAndTaxes(): React.ReactNode {
    if (settings.taxes !== ZERO) {
      const [ subtotal, taxes ] = calculateTotal(order.lines, settings.taxes);

      return (
        <>
          <CartOrderSum
            heading="Subtotal"
            price={subtotal}
            currency={settings.currency}
          />

          <CartOrderSum
            heading="Taxes"
            price={taxes}
            currency={settings.currency}
          />

          <Divider />
        </>
      );
    }
  }

  return (
    <Dialog
      className="popup"
      header="Payment"
      visible={isOpen}
      onHide={handleHide}
    >
      <div>
        <ScrollPanel style={{ width: '100%', height: '200px' }}>
          <CardListWrapper>
            {
              order.lines.map((line) => (
                <CartOrderLine
                  key={`${line.product.id}-${line.variant?.id || ZERO}`}
                  line={line}
                  editable={false}
                  currency={settings.currency}
                />
              ))
            }
          </CardListWrapper>
        </ScrollPanel>

        <div className="mt-4 rounded flex flex-col gap-1 p-2 bg-gray-50">
          { renderSubtotalAndTaxes() }

          <CartOrderSum
            heading="Total"
            price={getTotal()}
            currency={settings.currency}
          />
        </div>

        <div className="mt-4">
          <SelectButton
            className="grid grid-cols-3 w-full"
            value={selectedPaymentMethod}
            options={paymentMethods}
            optionLabel="label"
            itemTemplate={CartPaymentMethod}
            onChange={selectPaymentMethod}
          />
        </div>

        <div className="mt-4">
          <Button
            className="w-full p-button-sm"
            label="Process payment"
            disabled={!selectedPaymentMethod}
            loading={isPaymentProcessing}
            onClick={processPayment}
          />
        </div>
      </div>
    </Dialog>
  );

}
