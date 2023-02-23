import { loadContext } from 'shared/helpers/load-context';

import { ControllerName, StoreName } from '@admin/shared/constants';
import { OrdersInfoPageContainer } from '@admin/view/containers/OrdersInfoPageContainer';

const OrdersInfoPage = loadContext(Page, {
  stores: [ StoreName.ORDERS ],
  controllers: [ ControllerName.ORDERS ],
});

export default OrdersInfoPage;

function Page() {

  return <OrdersInfoPageContainer />;

}
