import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function DashboardPage() {

  const dashboardPage: AppPageSchema = pages[PageTitle.DASHBOARD];

  return (
    <PageLayout page={dashboardPage}>
      <div>@TODO: implement DASHBOARD</div>
    </PageLayout>
  );

}
