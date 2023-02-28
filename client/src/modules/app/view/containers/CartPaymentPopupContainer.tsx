import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';

import type { EmptyFunction, PaymentMethod } from 'shared/types';
import { ZERO } from 'shared/constants';
import { paymentMethods } from 'shared/configs/payment-methods';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CartStore, CartController } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';
import { CardListWrapper } from '@app/view/components/CardListWrapper';
import { CartOrderLine } from '@app/view/components/CartOrderLine';
import { CartPaymentMethod } from '@app/view/components/CartPaymentMethod';

export type Props = {
  isOpen: boolean;
  hide: EmptyFunction;
}

export function CartPaymentPopupContainer({ isOpen, hide }: Props) {

  const { state: { order } } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  const [ selectedPaymentMethod, setSelectedPaymentMethod ] = useState<PaymentMethod>();

  return (
    <Dialog
      className="popup"
      header="Payment"
      visible={isOpen}
      onHide={hide}
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
                />
              ))
            }
          </CardListWrapper>
        </ScrollPanel>

        <div className="mt-4 rounded flex items-center justify-between p-2 bg-gray-50">
          <h3>Total</h3>

          <strong>
            { order.lines.reduce((total, { price, count }) => total + (price * count), ZERO) }
          </strong>
        </div>

        <div className="mt-4">
          <SelectButton
            className="grid grid-cols-3 w-full"
            value={selectedPaymentMethod}
            options={paymentMethods}
            optionLabel="label"
            itemTemplate={CartPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.value)}
          />
        </div>

        <div className="mt-4">
          <Button
            className="w-full p-button-sm"
            label="Process payment"
            disabled={!selectedPaymentMethod}
          />
        </div>
      </div>
    </Dialog>
  );

}
