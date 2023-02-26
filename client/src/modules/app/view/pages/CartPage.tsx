import { loadContext } from 'view/helpers/load-context';

import { ControllerName, StoreName } from '@app/shared/constants';
import { loadMenu } from '@app/view/helpers/load-menu';
import { CartPageContainer } from '@app/view/containers/CartPageContainer';

const CartPage = loadContext(Page, {
  stores: [ StoreName.CART ],
  controllers: [ ControllerName.CART ],
});

export default CartPage;

function Page() {

  const Container = loadMenu(CartPageContainer);

  return <Container />;

}
