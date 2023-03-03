import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import type { OrderLineSchema, OrderSchema } from 'shared/types';
import type { Currency } from 'shared/constants';
import { BasePrice } from 'view/components/BasePrice';
import { CardHeading } from 'view/components/CardHeading';

import { CardWrapper } from 'view/components/CardWrapper';
import { OrdersLineProduct } from '@admin/view/components/OrdersLineProduct';

export type Props = {
  order: OrderSchema;
  currency: Currency;
  toInfoPage: (id: number) => void;
}

export function OrdersLinesCard({ order, currency, toInfoPage }: Props) {

  return (
    <CardWrapper className="col-span-3">
      <CardHeading heading="Products" />

      <div className="overflow-hidden rounded-xl border-2">
        <DataTable
          dataKey="id"
          value={order.lines}
          responsiveLayout="scroll"
        >
          <Column
            header="Product"
            field="product"
            body={(line: OrderLineSchema) => (
              <OrdersLineProduct line={line} toInfoPage={toInfoPage} />
            )}
          />

          <Column header="Count" field="count" />

          <Column
            header="Price"
            field="price"
            body={({ price }: OrderLineSchema) => (
              <BasePrice price={price} currency={currency} />
            )}
          />

          <Column
            header="Total"
            field="Total"
            body={({ count, price }: OrderLineSchema) => (
              <BasePrice price={count * price} currency={currency} />
            )}
          />
        </DataTable>
      </div>
    </CardWrapper>
  );

}
