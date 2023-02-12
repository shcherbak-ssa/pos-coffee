import type { Token } from 'shared/types';
import { LocalStorageKey, ROOT_PAGE_PATH } from 'shared/constants';
import { replaceLocation } from 'shared/utils';
import { LocalStorage } from 'shared/helpers/local-storage';
import { parseError } from 'shared/helpers/parse-error';
import { BaseController } from 'controllers/base-controller';

import type { LoginController as BaseLoginController, LoginSchema } from 'modules/login/shared/types';
import { LOGIN_API_ENDPOINT, LOGIN_VALIDATION } from 'modules/login/shared/constants';

export class LoginController extends BaseController implements BaseLoginController {

  public static create(): LoginController {
    return new LoginController();
  }

  public async processLogin(schema: LoginSchema): Promise<void> {
    try {
      await this.validation.validateToCreate(LOGIN_VALIDATION, schema);

      const token: Token = await this.api
        .addBody(schema)
        .post(LOGIN_API_ENDPOINT);

      LocalStorage.set(LocalStorageKey.USER_TOKEN, token);

      this.redirectToLastUrl();
    } catch (e: any) {
      parseError(e);
    }
  }

  private redirectToLastUrl(): void {
    const lastUrl: string | null = LocalStorage.get(LocalStorageKey.LAST_URL);
    LocalStorage.remove(LocalStorageKey.LAST_URL);

    replaceLocation(lastUrl || ROOT_PAGE_PATH);
  }

}
