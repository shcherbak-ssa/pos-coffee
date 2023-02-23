import type { OrderSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { OrdersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { type Return, useInfoPageContainer } from '@admin/view/hooks/info-page-container';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';
import { OrdersCard } from '@admin/view/components/OrdersCard';
import { OrdersLinesCard } from '@admin/view/components/OrdersLinesCard';

export function OrdersInfoPageContainer() {

  const { state: { selected: selectedOrder } } = useStore(StoreName.ORDERS) as OrdersStore;

  const [ pageLayoutProps ]: Return<OrderSchema> = useInfoPageContainer({
    page: {
      ...pages[PageTitle.ORDERS],
      to: PagePath.ORDERS,
      child: { title: selectedOrder.number },
    },
    storeName: StoreName.ORDERS,
    controllerName: ControllerName.ORDERS,
    infoPagePath: PagePath.ORDERS_INFO,
    entityName: EntityName.ORDER,
    isEditMode: false,
  });

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <InfoPageWrapper className="grid-cols-2">
          <OrdersCard order={selectedOrder} />

          <OrdersLinesCard order={selectedOrder} />
        </InfoPageWrapper>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
