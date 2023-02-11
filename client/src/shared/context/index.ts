import type { Controller, ControllerList, LoaderService, Store, StoreList } from 'shared/types';
import type { ControllerName, StoreName } from 'shared/constants';
import { ProgerError } from 'shared/errors';

export class Context {

  private static loader: LoaderService;
  private static controllers: ControllerList = new Map([]);
  private static stores: StoreList = new Map([]);

  public static getController(name: ControllerName): Controller {
    const controller: Controller | undefined = Context.controllers.get(name);

    if (controller) {
      return controller;
    }

    throw new ProgerError(`[CONTEXT] Controller ${name} does not exist`);
  }

  public static async loadController(name: ControllerName): Promise<void> {
    const controller: Controller = await Context.loader.loadController(name);

    Context.controllers.set(name, controller);
  }

  public static getStore(name: StoreName): Store {
    const store: Store | undefined = Context.stores.get(name);

    if (store) {
      return store;
    }

    throw new ProgerError(`[CONTEXT] Store ${name} does not exist`);
  }

  public static async loadStore(name: StoreName): Promise<void> {
    const store: Store = await Context.loader.loadStore(name);

    Context.stores.set(name, store);
  }

  public static getLoader(): LoaderService {
    return Context.loader;
  }

  public static setLoader(loader: LoaderService): void {
    Context.loader = loader;
  }

}
