import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import type { OrderLineSchema, OrderSchema } from 'shared/types';
import { CardHeading } from 'view/components/CardHeading';

import { CardWrapper } from '@admin/view/components/CardWrapper';
import { OrdersLine } from '@admin/view/components/OrdersLine';

export type Props = {
  order: OrderSchema;
}

export function OrdersLinesCard({ order }: Props) {

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
              <OrdersLine line={line} />
            )}
          />

          <Column header="Count" field="count" />
          <Column header="Price" field="price" />

          <Column
            header="Total"
            field="Total"
            body={({ count, price }: OrderLineSchema) => (
              <div>{ count * price }</div>
            )}
          />
        </DataTable>
      </div>
    </CardWrapper>
  );

}
