import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageContainer } from '@admin/view/containers/PageContainer';

export function HomePage() {

  const homePage: AppPageSchema = pages[PageTitle.HOME];

  return (
    <PageLayout page={homePage}>
      <PageContainer
        page={homePage}
        content={<div>@TODO: implement HOME</div>}
      />
    </PageLayout>
  );

}
