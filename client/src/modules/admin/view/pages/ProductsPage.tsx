import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function ProductsPage() {

  const productsPage: AppPageSchema = pages[PageTitle.PRODUCTS];

  return (
    <PageLayout page={productsPage}>
      <div>@TODO: implement PRODUCTS</div>
    </PageLayout>
  );

}
