import type { ColumnProps } from 'primereact/column';

import type { OrderSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { EmptyComponent } from 'view/components/EmptyComponent';

import { PageTitle, StoreName, ControllerName, PagePath, ControlGroup } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { usePageContainer } from '@admin/view/hooks/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';

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

  const pageLayoutProps: PageLayoutProps | undefined = usePageContainer({
    page: pages[PageTitle.ORDERS],
    entityName: EntityName.ORDER,
    storeName: StoreName.ORDERS,
    controllerName: ControllerName.ORDERS,
    infoPagePath: PagePath.ORDERS_INFO,
    tableColumns: ordersTableColumns,
    showTabs: false,
    controlGroups: [ ControlGroup.ACTIONS ],
  });

  if (pageLayoutProps) {
    return <PageLayout {...pageLayoutProps} />;
  }

  return <EmptyComponent />;

}
