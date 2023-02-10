import type { Controllers } from 'modules/login/types';
import type { LoaderService as BaseLoaderService, ValidationSchema } from 'shared/types';
import { ControllerName, ValidationSchemaName } from 'shared/constants';
import { ProgerError } from 'shared/errors';

export class LoaderService implements BaseLoaderService {

  private static service: LoaderService;

  private constructor() {}

  public static create(): LoaderService {
    if (!LoaderService.service) {
      LoaderService.service = new LoaderService();
    }

    return LoaderService.service;
  }

  public async loadController(name: ControllerName): Promise<Controllers> {
    switch (name) {
      case ControllerName.LOGIN: {
        const { LoginController } = await import('modules/login/controllers/login');

        return LoginController.create();
      }
    }

    throw new ProgerError(`Controller ${name} does not exist`);
  }

  public async loadValidationSchema<T>(schemaName: ValidationSchemaName): Promise<ValidationSchema<T>> {
    switch (schemaName) {
      case ValidationSchemaName.LOGIN: {
        const { schema } = await import('modules/login/services/validation/login-schema');

        return schema as ValidationSchema<T>;
      }
    }

    throw new ProgerError(`Validation schema ${schemaName} does not exist`);
  }

}
