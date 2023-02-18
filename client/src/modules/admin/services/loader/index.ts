import type { LoaderService as BaseLoaderService, Store, ValidationSchema } from 'shared/types';
import { ProgerError } from 'shared/errors';

import type { Controllers } from '@admin/shared/types';
import { ControllerName, StoreName, ValidationName } from '@admin/shared/constants';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: ControllerName): Promise<Controllers> {
    switch (name) {
      case ControllerName.APP: {
        const { AppController } = await import('@admin/controllers/app');

        return AppController.create();
      }
      case ControllerName.USERS: {
        const { UsersController } = await import('@admin/controllers/users');

        return UsersController.create();
      }
      case ControllerName.PRODUCTS: {
        const { ProductsController } = await import('@admin/controllers/products');

        return ProductsController.create();
      }
    }

    throw new ProgerError(`[LOADER] Controller ${name} does not exist`);
  }

  public async loadStore(name: StoreName): Promise<Store> {
    switch (name) {
      case StoreName.APP: {
        const { appStore } = await import('@admin/services/store/app');

        return appStore;
      }
      case StoreName.USERS: {
        const { usersStore } = await import('@admin/services/store/users');

        return usersStore;
      }
      case StoreName.PRODUCTS: {
        const { productsStore } = await import('@admin/services/store/products');

        return productsStore;
      }
    }

    throw new ProgerError(`[LOADER] Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: ValidationName): Promise<ValidationSchema<T>> {
    switch (name) {
      case ValidationName.USERS: {
        const { schema } = await import('@admin/services/validation/users-schema');

        return schema as ValidationSchema<T>;
      }
      case ValidationName.PRODUCTS: {
        const { schema } = await import('@admin/services/validation/products-schema');

        return schema as ValidationSchema<T>;
      }
    }

    throw new ProgerError(`[LOADER] Validation ${name} does not exist`);
  }

}
