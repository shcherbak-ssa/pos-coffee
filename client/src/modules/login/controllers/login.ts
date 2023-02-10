import type { LoginController as BaseLoginController, LoginSchema } from 'modules/login/types';

import type { Token } from 'shared/types';
import { ApiEndpoint, LocalStorageKey, PagePath, ValidationSchemaName } from 'shared/constants';
import { LocalStorage } from 'shared/utils/local-storage';
import { replaceLocation } from 'shared/utils';
import { BaseController } from 'lib/base-controller';

export class LoginController extends BaseController implements BaseLoginController {

  public static create(): LoginController {
    return new LoginController();
  }

  public async login(schema: LoginSchema): Promise<void> {
    try {
      await this.validation.validateToCreate(ValidationSchemaName.LOGIN, schema);

      const token: Token = await this.api
        .addBody(schema)
        .post(ApiEndpoint.LOGIN);

      LocalStorage.set(LocalStorageKey.USER_TOKEN, token);

      this.redirectToLastUrl();
    } catch (e: any) {
      this.parseError(e);
    }
  }

  private redirectToLastUrl(): void {
    const lastUrl: string | null = LocalStorage.get(LocalStorageKey.LAST_URL);
    LocalStorage.remove(LocalStorageKey.LAST_URL);

    replaceLocation(lastUrl || PagePath.ROOT);
  }

}
