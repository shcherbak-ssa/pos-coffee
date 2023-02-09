import type { Controller, LoaderService as BaseLoaderService } from 'shared/types';
import type { ControllerName } from 'shared/constants';

import { loadController } from './controllers';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: ControllerName): Promise<Controller> {
    return await loadController(name);
  }

}
