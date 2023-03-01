import { type MouseEvent, useState } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CartController, CartOrderLineSchema, CartStore } from '@app/shared/types';
import { ControllerName, PRODUCT_COUNT_STEP, StoreName } from '@app/shared/constants';
import { CartPaymentPopupContainer } from '@app/view/containers/CartPaymentPopupContainer';
import { CartOrderLine } from '@app/view/components/CartOrderLine';
import { CardListWrapper } from '@app/view/components/CardListWrapper';

export function CartOrderContainer() {

  const { state: { order } } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  const [ isPayPopupOpen, setIsPayPopupOpen ] = useState<boolean>(false);

  function addLine(line: CartOrderLineSchema): void {
    cartController.updateOrderLineCount(line, line.count + PRODUCT_COUNT_STEP);
  }

  function subtractLine(line: CartOrderLineSchema): void {
    cartController.updateOrderLineCount(line, line.count - PRODUCT_COUNT_STEP);
  }

  function clearAll(e: MouseEvent): void {
    e.preventDefault();

    cartController.removeAllOrderLines();
  }

  function openPayPopup(e: MouseEvent): void {
    e.preventDefault();

    setIsPayPopupOpen(true);
  }

  function renderLines(): React.ReactNode {
    if (order.lines.length) {
      return (
        <CardListWrapper>
          {
            order.lines.map((line) => (
              <CartOrderLine
                key={`${line.product.id}-${line.variant?.id || ZERO}`}
                line={line}
                addLine={addLine}
                subtractLine={subtractLine}
                editable
              />
            ))
          }
        </CardListWrapper>
      );
    }

    return (
      <div className="flex-center h-80">
        <div className="text-center">Order is empty</div>
      </div>
    );
  }

  function renderClearAllButton(): React.ReactNode {
    if (order && order.lines.length) {
      return (
        <Button
          className="p-button-sm p-button-text"
          label="Clear all"
          onClick={clearAll}
        />
      );
    }
  }

  return (
    <div className="flex flex-col justify-between full">
      <div style={{ height: 'calc(100% - 80px)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg">Order</h2>

          { renderClearAllButton() }
        </div>

        <ScrollPanel style={{ width: '100%', height: 'calc(100% - 45px)' }}>
          { renderLines() }
        </ScrollPanel>
      </div>

      <Button
        className="shrink-0 w-full p-button-sm"
        label="Pay"
        disabled={!order.lines.length}
        onClick={openPayPopup}
      />

      <CartPaymentPopupContainer
        isOpen={isPayPopupOpen}
        hide={() => setIsPayPopupOpen(false)}
      />
    </div>
  );

}
