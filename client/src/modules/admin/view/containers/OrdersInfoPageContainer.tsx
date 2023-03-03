import { useStore } from 'view/hooks/store';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { AppStore, OrdersStore } from '@admin/shared/types';
import { PagePath, StoreName } from '@admin/shared/constants';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';
import { OrdersCard } from '@admin/view/components/OrdersCard';
import { OrdersLinesCard } from '@admin/view/components/OrdersLinesCard';

export function OrdersInfoPageContainer() {

  const { state: { settings } } = useStore(StoreName.APP) as AppStore;
  const { state: { selected: selectedOrder } } = useStore(StoreName.ORDERS) as OrdersStore;

  const toUserInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const toProductInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.PRODUCTS_INFO);

  function moveToUserInfoPage(): void {
    toUserInfoPage({ id: selectedOrder.user.id });
  }

  function moveToProductInfoPage(productId: number): void {
    toProductInfoPage({ id: productId });
  }

  return (
    <InfoPageWrapper className="grid-cols-5">
      <OrdersCard
        order={selectedOrder}
        currency={settings.currency}
        toInfoPage={moveToUserInfoPage}
      />

      <OrdersLinesCard
        order={selectedOrder}
        currency={settings.currency}
        toInfoPage={moveToProductInfoPage}
      />
    </InfoPageWrapper>
  );

}
