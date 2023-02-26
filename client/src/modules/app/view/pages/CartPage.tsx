import { loadContext } from 'view/helpers/load-context';

import { ControllerName, StoreName } from '@app/shared/constants';
import { loadMenu } from '@app/view/helpers/load-menu';
import { CartContainer } from '@app/view/containers/CartContainer';

const CartPage = loadContext(Page, {
  stores: [ StoreName.MENU ],
  controllers: [ ControllerName.MENU ],
});

export default CartPage;

function Page() {

  const Container = loadMenu(CartContainer);

  return <Container />;

}
