import { loadContext } from 'view/helpers/load-context';

import { loadMenu } from '@app/view/helpers/load-menu';
import { CartPageContainer } from '@app/view/containers/CartPageContainer';

const CartPage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default CartPage;

function Page() {

  const Container = loadMenu(CartPageContainer);

  return <Container />;

}
