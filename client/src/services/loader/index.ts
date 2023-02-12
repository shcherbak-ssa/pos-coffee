import type { LoaderService as BaseLoaderService, Store, UsersController, ValidationSchema } from 'shared/types';
import { ControllerName, StoreName, type ValidationName } from 'shared/constants';
import { ProgerError } from 'shared/errors';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: ControllerName): Promise<UsersController> {
    switch (name) {
      case ControllerName.USERS: {
        const { UsersController } = await import('controllers/users');

        return UsersController.create();
      }
    }

    throw new ProgerError(`Controller ${name} does not exist`);
  }

  public async loadStore(name: StoreName): Promise<Store> {
    switch (name) {
      case StoreName.USERS: {
        const { UsersStore } = await import('services/store/users');

        return UsersStore.create();
      }
    }

    throw new ProgerError(`Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: ValidationName): Promise<ValidationSchema<T>> {
    throw new ProgerError('No validation for current step');
  }

}
