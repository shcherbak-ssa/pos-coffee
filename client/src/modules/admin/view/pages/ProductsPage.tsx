import { loadContext } from 'shared/helpers/load-context';

import { ControllerName, StoreName } from '@admin/shared/constants';
import { ProductsPageContainer } from '@admin/view/containers/ProductsPageContainer';

const ProductsPage = loadContext(Page, {
  stores: [ StoreName.PRODUCTS ],
  controllers: [ ControllerName.PRODUCTS ],
});

export default ProductsPage;

function Page() {

  return <ProductsPageContainer />;

}
