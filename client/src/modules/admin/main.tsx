import '@admin/view/styles/admin.scss';

import type { CurrentUserSchema } from 'shared/types';
import { Context } from 'shared/context';
import { replaceUrl } from 'shared/utils';
import { setupPrimeReact, render } from 'shared/helpers/setup-view';
import { setupCleanDataOncloseEvents } from 'shared/helpers/clean-onclose';

import type { UsersController } from '@admin/shared/types';
import { ControllerName, PagePath, StoreName } from '@admin/shared/constants';
import { LoaderService } from '@admin/services/loader';
import { EntryLayout } from '@admin/view/layouts/EntryLayout';

export async function renderAdmin(currentUser: CurrentUserSchema): Promise<void> {
  await setup(currentUser);

  if (!location.pathname.startsWith(PagePath.HOME)) {
    replaceUrl(PagePath.HOME);
  }

  render(<EntryLayout />);
}

async function setup(currentUser: CurrentUserSchema): Promise<void> {
  setupPrimeReact();
  setupCleanDataOncloseEvents();

  Context.setLoader(LoaderService.create());

  await Context.loadController(ControllerName.APP);
  await Context.loadController(ControllerName.USERS);

  await Context.loadStore(StoreName.APP);

  const usersController = Context.getController(ControllerName.USERS) as UsersController;
  await usersController.setCurrentUser(currentUser);
}
