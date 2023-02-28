import { loadContext } from 'view/helpers/load-context';

import { HomePageContainer } from '@app/view/containers/HomePageContainer';
import { loadHomeData } from '@app/view/helpers/load-home-data';

const HomePage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default HomePage;

function Page() {

  const Container = loadHomeData(HomePageContainer);

  return <Container />;

}
