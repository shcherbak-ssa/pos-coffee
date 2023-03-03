import type { ColumnProps } from 'primereact/column';

import type { OrderLineSchema, OrderSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { BasePrice } from 'view/components/BasePrice';

import type { AppStore } from '@admin/shared/types';
import { StoreName, PagePath, ControllerName } from '@admin/shared/constants';
import { PageDefaultContentContainer } from '@admin/view/containers/PageDefaultContentContainer';

export function OrdersPageContainer() {

  const { state: { settings } } = useStore(StoreName.APP) as AppStore;

  const ordersTableColumns: ColumnProps[] = [
    {
      field: 'number',
      header: 'Number',
    },
    {
      field: 'user',
      header: 'User',
      body: ({ user }: OrderSchema) => (
        <div>{ `${user.name} ${user.surname}` }</div>
      ),
    },
    {
      field: 'products',
      header: 'Products',
      body: ({ lines }: OrderSchema) => (
        <div>
          <span>{ lines.length } </span>
          <span>{ lines.length === 1 ? 'product' : 'products' } </span>
          <span>({ calculateTotalCount(lines) } qty)</span>
        </div>
      ),
    },
    {
      field: 'total',
      header: 'Total',
      body: ({ total }: OrderSchema) => (
        <BasePrice price={total} currency={settings.currency} />
      ),
    },
    {
      field: 'createdAt',
      header: 'Created',
      body: ({ createdAt }: OrderSchema) => (
        <div>{ createdAt?.toLocaleDateString() }</div>
      ),
    },
  ];

  function calculateTotalCount(lines: OrderLineSchema[]): number {
    return lines.reduce((total, line) => total + line.count, ZERO);
  }

  return (
    <PageDefaultContentContainer
      storeName={StoreName.ORDERS}
      controllerName={ControllerName.ORDERS}
      infoPagePath={PagePath.ORDERS_INFO}
      tableColumns={ordersTableColumns}
    />
  );

}
