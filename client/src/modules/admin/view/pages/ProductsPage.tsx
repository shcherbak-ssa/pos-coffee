import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageTitle } from 'modules/admin/shared/constants';
import { pages } from 'modules/admin/shared/configs';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';

export function ProductsPage() {

  const productsPage: AppPageSchema = pages[PageTitle.PRODUCTS];

  return (
    <PageLayout page={productsPage}>
      <div>@TODO: implement PRODUCTS</div>
    </PageLayout>
  );

}
