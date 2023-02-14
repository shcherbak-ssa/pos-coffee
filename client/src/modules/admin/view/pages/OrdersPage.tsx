import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function OrdersPage() {

  const ordersPage: AppPageSchema = pages[PageTitle.ORDERS];

  return (
    <PageLayout page={ordersPage}>
      <div>@TODO: implement ORDERS</div>
    </PageLayout>
  );

}
