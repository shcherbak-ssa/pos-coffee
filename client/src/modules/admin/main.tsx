import '@admin/view/styles/admin.scss';

import type { UserSchema } from 'shared/types';
import { Context } from 'shared/context';
import { replaceLocation } from 'shared/utils/replace-location';
import { setupPrimeReact, render } from 'view/helpers/setup-view';

import type { AppController } from '@admin/shared/types';
import { ControllerName, PagePath, StoreName } from '@admin/shared/constants';
import { LoaderService } from '@admin/services/loader';
import { AppLayout } from '@admin/view/layouts/AppLayout';

export async function renderAdmin(currentUser: UserSchema): Promise<void> {
  await setup(currentUser);

  render(<AppLayout />);
}

async function setup(currentUser: UserSchema): Promise<void> {
  setupPrimeReact();

  if (!location.pathname.startsWith(PagePath.HOME)) {
    replaceLocation(PagePath.HOME);
  }

  Context.setLoader(LoaderService.create());

  await Context.loadController(ControllerName.APP);
  await Context.loadStore(StoreName.APP);

  const appController = Context.getController(ControllerName.APP) as AppController;
  await appController.setCurrentUser(currentUser);
}
