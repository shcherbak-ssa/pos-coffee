import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import type { Props as ActionsProps } from '@admin/view/components/PageHeaderActions';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function DashboardPage() {

  const dashboardPage: AppPageSchema = pages[PageTitle.DASHBOARD];

  const actionsProps: ActionsProps = { isEntityPage: false };

  return (
    <PageLayout page={dashboardPage} actionsProps={actionsProps}>
      <div>@TODO: implement DASHBOARD</div>
    </PageLayout>
  );

}
