import type { LoaderService as BaseLoaderService, Store, ValidationSchema } from 'shared/types';
import { ProgerError } from 'shared/errors';

import type { Controllers } from '@login/shared/types';
import { LOGIN_CONTROLLER, LOGIN_STORE, LOGIN_VALIDATION } from '@login/shared/constants';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: string): Promise<Controllers> {
    switch (name) {
      case LOGIN_CONTROLLER: {
        const { LoginController } = await import('@login/controllers/login');

        return LoginController.create();
      }
    }

    throw new ProgerError(`Controller ${name} does not exist`);
  }

  public async loadStore(name: string): Promise<Store> {
    switch (name) {
      case LOGIN_STORE: {
        const { loginStore } = await import('@login/services/store/login');

        return loginStore;
      }
    }

    throw new ProgerError(`Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: string): Promise<ValidationSchema<T>> {
    switch (name) {
      case LOGIN_VALIDATION: {
        const { schema } = await import('@login/services/validation/login-schema');

        return schema as ValidationSchema<T>;
      }
    }

    throw new ProgerError(`Validation ${name} does not exist`);
  }

}
