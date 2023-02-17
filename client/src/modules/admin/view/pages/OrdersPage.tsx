import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import type { Props as ActionsProps } from '@admin/view/components/PageHeaderActions';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function OrdersPage() {

  const ordersPage: AppPageSchema = pages[PageTitle.ORDERS];

  const actionsProps: ActionsProps = { isEntityPage: false };

  return (
    <PageLayout page={ordersPage} actionsProps={actionsProps}>
      <div>@TODO: implement ORDERS</div>
    </PageLayout>
  );

}
