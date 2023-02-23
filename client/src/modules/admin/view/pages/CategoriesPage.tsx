import { loadContext } from 'shared/helpers/load-context';

import { ControllerName, StoreName } from '@admin/shared/constants';
import { CategoriesPageContainer } from '@admin/view/containers/CategoriesPageContainer';

const ProductsPage = loadContext(Page, {
  stores: [ StoreName.CATEGORIES ],
  controllers: [ ControllerName.CATEGORIES ],
});

export default ProductsPage;

function Page() {

  return <CategoriesPageContainer />;

}
