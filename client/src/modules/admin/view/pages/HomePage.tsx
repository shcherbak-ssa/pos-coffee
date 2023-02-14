import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageWrapper } from '@admin/view/components/page/PageWrapper';

export function HomePage() {

  const homePage: AppPageSchema = pages[PageTitle.HOME];

  return (
    <PageLayout page={homePage}>
      <PageWrapper
        page={homePage}
        content={<div>@TODO: implement HOME</div>}
      />
    </PageLayout>
  );

}
