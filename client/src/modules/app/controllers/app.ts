import type { UserSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type { AppController as BaseAppController, AppStoreActions } from '@app/shared/types';
import { StoreName } from '@app/shared/constants';

export class AppController extends BaseController implements BaseAppController {

  public static create(): AppController {
    return new AppController(StoreName.APP, EntityName.ANY);
  }

  public async setLoggedUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setLoggedUser(user);
  }

}
