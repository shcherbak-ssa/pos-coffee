import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import type { OrderSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { CardHeading } from 'view/components/CardHeading';
import { BasePrice } from 'view/components/BasePrice';
import { CardWrapper } from 'view/components/CardWrapper';

import type { AppStore } from "@app/shared/types";
import { StoreName } from "@app/shared/constants";

export function HomeOrdersContainer() {

  const { state: { settings }, orders } = useStore(StoreName.APP) as AppStore;

  return (
    <div style={{ height: 'calc(100% - 88px)' }}>
      <CardWrapper className="col-span-2 h-full">
        <CardHeading className="mb-6" heading="Orders" />

        <div className="overflow-hidden rounded-xl">
          <DataTable
            dataKey="id"
            value={orders}
            responsiveLayout="scroll"
            scrollable
            scrollHeight="300px"
          >
            <Column header="Number" field="number" />

            <Column
              header="User"
              field="user"
              body={({ user }: OrderSchema) => (
                <div>{ `${user.name} ${user.surname}` }</div>
              )}
            />

            <Column
              header="Products"
              field="products"
              body={({ lines }: OrderSchema) => (
                <div>{ lines.length }</div>
              )}
            />

            <Column
              header="Total"
              field="total"
              body={({ total }: OrderSchema) => (
                <BasePrice price={total} currency={settings.currency} />
              )}
            />

            <Column
              header="Created"
              field="createdAt"
              body={({ createdAt }: OrderSchema) => (
                <div>{ createdAt?.toLocaleTimeString() }</div>
              )}
            />
          </DataTable>
        </div>
      </CardWrapper>
    </div>
  );

}
