import { loadContext } from 'shared/helpers/load-context';

import { StoreName, ControllerName } from '@admin/shared/constants';
import { UsersPageContainer } from '@admin/view/containers/UsersPageContainer';

const UsersPage = loadContext(Page, {
  stores: [ StoreName.USERS ],
  controllers: [ ControllerName.USERS ],
});

export default UsersPage;

function Page() {

  return <UsersPageContainer />;

}
