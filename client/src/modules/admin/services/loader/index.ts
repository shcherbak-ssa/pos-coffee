import type { LoaderService as BaseLoaderService, Store, ValidationSchema } from 'shared/types';
import { ProgerError } from 'shared/errors';

import type { Controllers } from 'modules/admin/shared/types';
import { ControllerName, StoreName, ValidationName } from 'modules/admin/shared/constants';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: ControllerName): Promise<Controllers> {
    switch (name) {
      case ControllerName.APP: {
        const { AppController } = await import('modules/admin/controllers/app');

        return AppController.create();
      }
      case ControllerName.USERS: {
        const { UsersController } = await import('modules/admin/controllers/users');

        return UsersController.create();
      }
    }

    throw new ProgerError(`Controller ${name} does not exist`);
  }

  public async loadStore(name: StoreName): Promise<Store> {
    switch (name) {
      case StoreName.APP: {
        const { appStore } = await import('modules/admin/services/store/app');

        return appStore;
      }
      case StoreName.USERS: {
        const { usersStore } = await import('modules/admin/services/store/users');

        return usersStore;
      }
    }

    throw new ProgerError(`Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: ValidationName): Promise<ValidationSchema<T>> {
    switch (name) {
      case ValidationName.USERS: {
        const { schema } = await import('modules/admin/services/validation/users-schema');

        return schema as ValidationSchema<T>;
      }
    }

    throw new ProgerError(`Validation ${name} does not exist`);
  }

}
