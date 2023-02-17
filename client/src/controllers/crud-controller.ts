import type { CrudController as BaseCrudController, CrudStore, Store } from 'shared/types';

import type { ApiService } from 'shared/types';
import { BaseController } from 'controllers/base-controller';
import { Context } from 'shared/context';
import { ProgerError } from 'shared/errors';

export class CrudController extends BaseController implements BaseCrudController {

  private storeName: string;

  protected constructor(storeName: string) {
    super();
    this.storeName = storeName;
  }

  public async loadById(entityId: number): Promise<boolean> {
    throw new ProgerError(`Method CrudController.loadById() not implemented.`);
  }

  public async loadAll<T>(filter?: T): Promise<boolean> {
    throw new ProgerError(`Method CrudController.loadAll() not implemented.`);
  }

  public async save<T>(entity: T): Promise<number | void> {
    throw new ProgerError(`Method CrudController.save() not implemented.`);
  }

  public async delete(entityId: number): Promise<boolean> {
    throw new ProgerError(`Method CrudController.delete() not implemented.`);
  }

  public async restore(entityId: number): Promise<boolean> {
    throw new ProgerError(`Method CrudController.restore() not implemented.`);
  }

  protected async tryToLoadById<T>(
    { entityId, endpoint }: { entityId: number, endpoint: string },
  ): Promise<boolean> {
    try {
      const apiService: ApiService = await this.getApiService();

      const entity: T = await apiService
        .addParams({ id: entityId })
        .get(endpoint);

      const store = await this.getStore() as CrudStore;
      store.add(entity);

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  protected async getStore(): Promise<Store> {
    await Context.loadStore(this.storeName);

    return Context.getStore(this.storeName);
  }

}
