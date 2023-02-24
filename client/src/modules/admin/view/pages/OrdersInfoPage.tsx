import { EntityName } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';

import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { infoPageContainer } from '@admin/view/helpers/info-page-container';
import { type Props as InfoPageLayoutProps, InfoPageLayout } from '@admin/view/layouts/InfoPageLayout';
import { OrdersInfoPageContainer } from '@admin/view/containers/OrdersInfoPageContainer';

const OrdersInfoPage = loadContext(Page, {
  stores: [ StoreName.ORDERS ],
  controllers: [ ControllerName.ORDERS ],
});

const InfoPageContainer = infoPageContainer(OrdersInfoPageContainer, {
  controllerName: ControllerName.ORDERS,
  entityName: EntityName.ORDER,
});

export default OrdersInfoPage;

function Page() {

  const pageLayoutProps: Omit<InfoPageLayoutProps, 'children'> = {
    page: {
      ...pages[PageTitle.ORDERS],
      to: PagePath.ORDERS,
    },
  };

  return (
    <InfoPageLayout {...pageLayoutProps}>
      <InfoPageContainer />
    </InfoPageLayout>
  );

}
