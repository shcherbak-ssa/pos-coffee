import type { ApiService, OrderSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type { AppController as BaseAppController, AppHomeData, AppStoreActions, UserSchema } from '@app/shared/types';
import { ApiEndpoint, StoreName } from '@app/shared/constants';

export class AppController extends BaseController implements BaseAppController {

  public static create(): AppController {
    return new AppController(StoreName.APP, EntityName.ANY);
  }

  public async setManager(user: UserSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setManager(user);
  }

  public async setCashier(user: UserSchema | null): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setCashier(user);
  }

  public async addLoggedUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.addLoggedUser(user);
  }

  public async removeLoggedUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.removeLoggedUser(user);
  }

  public async loadData(): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const { users, orders }: AppHomeData = await apiService.get(ApiEndpoint.APP_HOME);

      const store = await this.getStore() as AppStoreActions;
      store.setUsers(users);
      store.setOrders(orders);
    } catch (e: any) {
      this.parseError(e);
    }
  }

}
