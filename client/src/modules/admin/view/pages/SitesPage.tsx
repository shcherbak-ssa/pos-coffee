import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageTitle } from 'modules/admin/shared/constants';
import { pages } from 'modules/admin/shared/configs';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';

export function SitesPage() {

  const sitesPage: AppPageSchema = pages[PageTitle.SITES];

  return (
    <PageLayout page={sitesPage}>
      <div>@TODO: implement SITES</div>
    </PageLayout>
  );

}
