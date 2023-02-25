import type { LoaderService as BaseLoaderService, Store, ValidationSchema } from 'shared/types';
import { ProgerError } from 'shared/errors';

import type { Controllers } from '@app/shared/types';
import { ControllerName, StoreName, ValidationName } from '@app/shared/constants';

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
    }

    throw new ProgerError(`[LOADER] Controller ${name} does not exist`);
  }

  public async loadStore(name: StoreName): Promise<Store> {
    switch (name) {
      case StoreName.APP: {
        const { appStore } = await import('@app/services/store/app');

        return appStore;
      }
    }

    throw new ProgerError(`[LOADER] Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: ValidationName): Promise<ValidationSchema<T>> {
    throw new ProgerError(`[LOADER] Validation ${name} does not exist`);
  }

}
