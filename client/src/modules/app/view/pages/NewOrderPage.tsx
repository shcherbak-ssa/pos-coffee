import { loadContext } from 'view/helpers/load-context';

import { ControllerName, StoreName } from '@app/shared/constants';
import { loadMenu } from '@app/view/helpers/load-menu';
import { NewOrderContainer } from '@app/view/containers/NewOrderContainer';

const NewOrderPage = loadContext(Page, {
  stores: [ StoreName.MENU ],
  controllers: [ ControllerName.MENU ],
});

export default NewOrderPage;

function Page() {

  const Container = loadMenu(NewOrderContainer);

  return <Container />;

}
