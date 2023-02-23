import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import type { OrderLineSchema, OrderSchema } from 'shared/types';

import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';
import { OrdersLineVariant } from '@admin/view/components/OrdersLineVariant';

export type Props = {
  order: OrderSchema;
}

export function OrdersLinesCard({ order }: Props) {

  return (
    <CardWrapper>
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
            body={({ variant }: OrderLineSchema) => (
              <OrdersLineVariant variant={variant} />
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
