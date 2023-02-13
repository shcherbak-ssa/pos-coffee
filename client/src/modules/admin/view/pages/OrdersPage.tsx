import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageTitle } from 'modules/admin/shared/constants';
import { pages } from 'modules/admin/shared/configs';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';

export function OrdersPage() {

  const ordersPage: AppPageSchema = pages[PageTitle.ORDERS];

  return (
    <PageLayout page={ordersPage}>
      <div>@TODO: implement ORDERS</div>
    </PageLayout>
  );

}
