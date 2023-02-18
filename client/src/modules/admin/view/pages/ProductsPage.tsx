import { loadContext } from 'shared/helpers/load-context';

import { ControllerName, StoreName } from '@admin/shared/constants';

const ProductsPage = loadContext(Page, {
  stores: [ StoreName.PRODUCTS ],
  controllers: [ ControllerName.PRODUCTS ],
});

export default ProductsPage;

function Page() {

  return (
    <div>@TODO: implement PRODUCTS</div>
  );

}
