import { loadContext } from 'view/helpers/load-context';

const HomePage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default HomePage;

function Page() {

  return (
    <div>Home page</div>
  );

}
