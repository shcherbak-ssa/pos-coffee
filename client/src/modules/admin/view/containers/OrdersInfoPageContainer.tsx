import { useStore } from 'view/hooks/store';

import type { OrdersStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';
import { OrdersCard } from '@admin/view/components/OrdersCard';
import { OrdersLinesCard } from '@admin/view/components/OrdersLinesCard';

export function OrdersInfoPageContainer() {

  const { state: { selected: selectedOrder } } = useStore(StoreName.ORDERS) as OrdersStore;

  return (
    <InfoPageWrapper className="grid-cols-5">
      <OrdersCard order={selectedOrder} />

      <OrdersLinesCard order={selectedOrder} />
    </InfoPageWrapper>
  );

}
