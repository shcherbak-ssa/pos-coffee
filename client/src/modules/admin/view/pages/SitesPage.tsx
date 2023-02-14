import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function SitesPage() {

  const sitesPage: AppPageSchema = pages[PageTitle.SITES];

  return (
    <PageLayout page={sitesPage}>
      <div>@TODO: implement SITES</div>
    </PageLayout>
  );

}
