import { loadContext } from 'shared/helpers/load-context';

import { StoreName, ControllerName } from '@admin/shared/constants';
import { UsersInfoPageContainer } from '@admin/view/containers/UsersInfoPageContainer';

export type Props = {
  isEditMode?: boolean;
}

const UsersInfoPage = loadContext(Page, {
  stores: [ StoreName.USERS ],
  controllers: [ ControllerName.USERS ],
});

export default UsersInfoPage;

function Page({ isEditMode = false }: Props) {

  return <UsersInfoPageContainer isEditMode={isEditMode} />;

}
