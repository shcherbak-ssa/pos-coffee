import { loadContext } from 'shared/helpers/load-context';

import { ControllerName, StoreName } from '@admin/shared/constants';
import { OrdersPageContainer } from '@admin/view/containers/OrdersPageContainer';

const OrdersPage = loadContext(Page, {
  stores: [ StoreName.ORDERS ],
  controllers: [ ControllerName.ORDERS ],
});

export default OrdersPage;

function Page() {

  return <OrdersPageContainer />;

}
