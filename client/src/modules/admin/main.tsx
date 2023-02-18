import '@admin/view/styles/admin.scss';

import type { UserSchema } from 'shared/types';
import { Context } from 'shared/context';
import { replaceLocation } from 'shared/utils';
import { setupPrimeReact, render } from 'shared/helpers/setup-view';

import type { UsersController } from '@admin/shared/types';
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
  await Context.loadController(ControllerName.USERS);

  await Context.loadStore(StoreName.APP);

  const usersController = Context.getController(ControllerName.USERS) as UsersController;
  await usersController.setCurrentUser(currentUser);
}
