import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { useCurrentPage } from '@admin/view/hooks/current-page';
import { HomePageContainer } from '@admin/view/containers/HomePageContainer';

export default function HomePage() {

  useCurrentPage(pages[PageTitle.HOME]);

  return <HomePageContainer />;

}
