import { PrimeIcons } from 'primereact/api';

import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageTitle } from 'modules/admin/shared/constants';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';
import { PageContainer } from 'modules/admin/view/containers/PageContainer';
import { pages } from 'modules/admin/shared/configs';

export function HomePage() {

  const homePage: AppPageSchema = pages[PageTitle.HOME];

  return (
    <PageLayout page={homePage}>
      <PageContainer page={homePage} />

      <div>@TODO: implement HOME</div>
    </PageLayout>
  );

}
