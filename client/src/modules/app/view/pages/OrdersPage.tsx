import { loadContext } from 'view/helpers/load-context';

const OrdersPage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default OrdersPage;

function Page() {

  return (
    <div>Orders page</div>
  );

}
