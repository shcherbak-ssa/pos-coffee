import { EntityName } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';

import { StoreName, ControllerName, PageTitle, PagePath } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { pageContainer } from '@admin/view/helpers/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { UsersPageContainer } from '@admin/view/containers/UsersPageContainer';

const UsersPage = loadContext(Page, {
  stores: [ StoreName.USERS ],
  controllers: [ ControllerName.USERS ],
});

const PageContainer = pageContainer(UsersPageContainer, {
  entityName: EntityName.USER,
  storeName: StoreName.USERS,
  controllerName: ControllerName.USERS,
});

export default UsersPage;

function Page() {

  const pageLayoutProps: Omit<PageLayoutProps, 'children'> = {
    page: pages[PageTitle.USERS],
    buttonProps: {
      label: 'Create new user',
      to: PagePath.USERS_INFO,
    },
  };

  return (
    <PageLayout {...pageLayoutProps}>
      <PageContainer />
    </PageLayout>
  );

}
