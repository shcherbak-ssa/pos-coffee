import type { LoaderService as BaseLoaderService, Store, ValidationSchema } from 'shared/types';
import { ProgerError } from 'shared/errors';

import type { Controllers } from '@app/shared/types';
import { ControllerName, StoreName } from '@app/shared/constants';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: ControllerName): Promise<Controllers> {
    switch (name) {
      case ControllerName.APP: {
        const { AppController } = await import('@app/controllers/app');

        return AppController.create();
      }
      case ControllerName.CART: {
        const { CartController } = await import('@app/controllers/cart');

        return CartController.create();
      }
    }

    throw new ProgerError(`[LOADER] Controller ${name} does not exist`);
  }

  public async loadStore(name: StoreName): Promise<Store> {
    switch (name) {
      case StoreName.APP: {
        const { appStore } = await import('@app/services/store/app');

        return appStore;
      }
      case StoreName.CART: {
        const { cartStore } = await import('@app/services/store/cart');

        return cartStore;
      }
    }

    throw new ProgerError(`[LOADER] Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: string): Promise<ValidationSchema<T>> {
    throw new ProgerError(`[LOADER] Validation ${name} does not exist`);
  }

}
