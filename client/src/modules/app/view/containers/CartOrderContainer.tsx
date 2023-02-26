import type { MouseEvent } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';

import type { OrderLineSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { CartController, CartStore } from '@app/shared/types';
import { ControllerName, PRODUCT_COUNT_STEP, StoreName } from '@app/shared/constants';
import { CartOrderLine } from '@app/view/components/CartOrderLine';

export function CartOrderContainer() {

  const { state: { currentOrder } } = useStore(StoreName.CART) as CartStore;
  const cartController = useController(ControllerName.CART) as CartController;

  function addLine(line: OrderLineSchema): void {
    cartController.updateOrderLineCount(line, line.count + PRODUCT_COUNT_STEP);
  }

  function subtractLine(line: OrderLineSchema): void {
    cartController.updateOrderLineCount(line, line.count - PRODUCT_COUNT_STEP);
  }

  function clearAll(e: MouseEvent): void {
    e.preventDefault();

    cartController.removeAllOrderLines();
  }

  function renderLines(): React.ReactNode {
    if (currentOrder.lines.length) {
      return currentOrder.lines.map((line) => (
        <CartOrderLine
          key={`${line.productId}-${line.variantId}`}
          line={line}
          addLine={addLine}
          subtractLine={subtractLine}
        />
      ));
    }

    return <small className="text-center">Order is empty</small>;
  }

  function renderClearAllButton(): React.ReactNode {
    if (currentOrder && currentOrder.lines.length) {
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
          <h2>Order</h2>

          { renderClearAllButton() }
        </div>

        <ScrollPanel style={{ width: '100%', height: 'calc(100% - 45px)' }}>
          <div className="flex flex-col gap-2 pb-2">
            { renderLines() }
          </div>
        </ScrollPanel>
      </div>

      <Button
        className="shrink-0 w-full"
        label="Pay"
        disabled={!currentOrder.lines.length}
      />
    </div>
  );

}
