import { useStore } from 'view/hooks/store';

import type { AppStore, OrdersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';
import { OrdersCard } from '@admin/view/components/OrdersCard';
import { OrdersLinesCard } from '@admin/view/components/OrdersLinesCard';

export function OrdersInfoPageContainer() {

  const { state: { settings } } = useStore(StoreName.APP) as AppStore;
  const { state: { selected: selectedOrder } } = useStore(StoreName.ORDERS) as OrdersStore;

  return (
    <InfoPageWrapper className="grid-cols-5">
      <OrdersCard
        order={selectedOrder}
        currency={settings.currency}
      />

      <OrdersLinesCard
        order={selectedOrder}
        currency={settings.currency}
      />
    </InfoPageWrapper>
  );

}
