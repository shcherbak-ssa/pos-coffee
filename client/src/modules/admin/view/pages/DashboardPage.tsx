import { pages } from 'modules/admin/shared/configs';
import { PageTitle } from 'modules/admin/shared/constants';
import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';

export function DashboardPage() {

  const dashboardPage: AppPageSchema = pages[PageTitle.DASHBOARD];

  return (
    <PageLayout page={dashboardPage}>
      <div>@TODO: implement DASHBOARD</div>
    </PageLayout>
  );

}
