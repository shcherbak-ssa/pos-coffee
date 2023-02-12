import type { Token } from 'shared/types';
import { ApiEndpoint, LocalStorageKey, PagePath, ValidationName } from 'shared/constants';
import { replaceLocation } from 'shared/utils';
import { LocalStorage } from 'shared/helpers/local-storage';
import { parseError } from 'shared/helpers/parse-error';
import { BaseController } from 'controllers/base-controller';

import type { LoginController as BaseLoginController, LoginSchema } from 'modules/login/shared/types';

export class LoginController extends BaseController implements BaseLoginController {

  public static create(): LoginController {
    return new LoginController();
  }

  public async processLogin(schema: LoginSchema): Promise<void> {
    try {
      await this.validation.validateToCreate(ValidationName.LOGIN, schema);

      const token: Token = await this.api
        .addBody(schema)
        .post(ApiEndpoint.LOGIN);

      LocalStorage.set(LocalStorageKey.USER_TOKEN, token);

      this.redirectToLastUrl();
    } catch (e: any) {
      parseError(e);
    }
  }

  private redirectToLastUrl(): void {
    const lastUrl: string | null = LocalStorage.get(LocalStorageKey.LAST_URL);
    LocalStorage.remove(LocalStorageKey.LAST_URL);

    replaceLocation(lastUrl || PagePath.ROOT);
  }

}
