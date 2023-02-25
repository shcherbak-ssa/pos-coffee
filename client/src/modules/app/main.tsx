import '@app/view/styles/app.scss';

import { Context } from 'shared/context';
import { replaceLocation } from 'shared/utils/replace-location';
import { render, setupPrimeReact } from 'view/helpers/setup-view';

import type { AppController, UserSchema } from '@app/shared/types';
import { ControllerName, PagePath, StoreName } from '@app/shared/constants';
import { LoaderService } from '@app/services/loader';
import { AppLayout } from '@app/view/layouts/AppLayout';

export async function renderApp(currentUser: UserSchema): Promise<void> {
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
  await appController.setLoggedUser(currentUser);
}
