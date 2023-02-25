import { EntityName } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';

import { ControlGroup, ControllerName, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { pageContainer } from '@admin/view/helpers/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { OrdersPageContainer } from '@admin/view/containers/OrdersPageContainer';

const OrdersPage = loadContext(Page, {
  stores: [ StoreName.ORDERS ],
  controllers: [ ControllerName.ORDERS ],
});

const PageContainer = pageContainer(OrdersPageContainer, {
  entityName: EntityName.ORDER,
  storeName: StoreName.ORDERS,
  controllerName: ControllerName.ORDERS,
});

export default OrdersPage;

function Page() {

  const pageLayoutProps: Omit<PageLayoutProps, 'children'> = {
    page: pages[PageTitle.ORDERS],
    controlGroups: [ ControlGroup.ACTIONS ],
    showTabs: false,
  };

  return (
    <PageLayout {...pageLayoutProps}>
      <PageContainer />
    </PageLayout>
  );

}
