import { EntityName } from 'shared/constants';
import { loadContext } from 'view/helpers/load-context';

import { StoreName, ControllerName, PageTitle, PagePath } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { infoPageContainer } from '@admin/view/helpers/info-page-container';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import { type Props as InfoPageLayoutProps, InfoPageLayout } from '@admin/view/layouts/InfoPageLayout';
import { UsersInfoPageContainer } from '@admin/view/containers/UsersInfoPageContainer';

const UsersInfoPage = loadContext(Page, {
  stores: [ StoreName.USERS ],
  controllers: [ ControllerName.USERS ],
});

const InfoPageContainer = infoPageContainer(UsersInfoPageContainer, {
  controllerName: ControllerName.USERS,
  entityName: EntityName.USER,
});

export default UsersInfoPage;

function Page() {

  const actionsMenuItemsProps: ActionsMenuItemsProps = useUsersActionsMenuItemsProps();

  const pageLayoutProps: Omit<InfoPageLayoutProps, 'children'> = {
    page: {
      ...pages[PageTitle.USERS],
      to: PagePath.USERS,
    },
    actionProps: {
      storeName: StoreName.USERS,
      controllerName: ControllerName.USERS,
      actionsMenuItemsProps,
    },
  };

  return (
    <InfoPageLayout {...pageLayoutProps}>
      <InfoPageContainer />
    </InfoPageLayout>
  );

}
