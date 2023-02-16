import { Context } from 'shared/context';

import type { AppController as BaseAppController, AppStore, AppStoreActions } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';

export class AppController implements BaseAppController {

  private constructor() {}

  public static create(): AppController {
    return new AppController();
  }

  public async setIsAppMenuOpen(isOpen: boolean): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setIsAppMenuOpen(isOpen);
  }

  private async getStore(): Promise<AppStore> {
    await Context.loadStore(StoreName.APP);

    return Context.getStore(StoreName.APP) as AppStore;
  }

}
