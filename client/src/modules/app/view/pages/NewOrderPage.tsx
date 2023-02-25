import { loadContext } from 'view/helpers/load-context';

const NewOrderPage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default NewOrderPage;

function Page() {

  return (
    <div>New order page</div>
  );

}
