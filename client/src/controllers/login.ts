import type { LoginController as BaseLoginController, LoginSchema, Token } from 'shared/types';
import { ApiEndpoint, LocalStorageKey, PagePath, ValidationSchemaName } from 'shared/constants';
import { LocalStorage, replaceLocation } from 'shared/utils';

import { BaseController } from './lib/base';

export class LoginController extends BaseController implements BaseLoginController {

  public static create(): LoginController {
    return new LoginController();
  }

  public async login(schema: LoginSchema): Promise<void> {
    try {
      await this.validation.validateToCreate(ValidationSchemaName.LOGIN, schema);

      const token: Token = await this.api.post({
        endpoint: ApiEndpoint.LOGIN,
        body: schema,
      });

      LocalStorage.set(LocalStorageKey.USER_TOKEN, token);

      replaceLocation(PagePath.ROOT);
    } catch (e: any) {
      this.parseError(e);
    }
  }

}
