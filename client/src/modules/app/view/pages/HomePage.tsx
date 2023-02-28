import { loadContext } from 'view/helpers/load-context';

import { HomePageContainer } from '@app/view/containers/HomePageContainer';

const HomePage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default HomePage;

function Page() {

  return <HomePageContainer />;

}
