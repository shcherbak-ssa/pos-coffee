import type { ColumnProps } from 'primereact/column';

import type { OrderSchema } from 'shared/types';

import { StoreName, PagePath } from '@admin/shared/constants';
import { PageDefaultContentContainer } from '@admin/view/containers/PageDefaultContentContainer';

export function OrdersPageContainer() {

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
        <div>{ lines.length }</div>
      ),
    },
    {
      field: 'total',
      header: 'Total',
    },
    {
      field: 'createdAt',
      header: 'Created',
      body: ({ createdAt }: OrderSchema) => (
        <div>{ createdAt?.toLocaleDateString() }</div>
      ),
    },
  ];

  return (
    <PageDefaultContentContainer
      storeName={StoreName.ORDERS}
      infoPagePath={PagePath.ORDERS_INFO}
      tableColumns={ordersTableColumns}
    />
  );

}
