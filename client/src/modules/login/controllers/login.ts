import type { LoginController as BaseLoginController } from 'modules/login/types';
import type { Login } from 'modules/login/models/login';

import type { Token } from 'shared/types';
import { ApiEndpoint, LocalStorageKey, PagePath, ValidationName } from 'shared/constants';
import { LocalStorage } from 'shared/utils/local-storage';
import { replaceLocation } from 'shared/utils';
import { BaseController } from 'lib/base-controller';

export class LoginController extends BaseController implements BaseLoginController {

  public static create(): LoginController {
    return new LoginController();
  }

  public async processLogin(model: Login): Promise<void> {
    try {
      await this.validation.validateToCreate(ValidationName.LOGIN, model.schema);

      const token: Token = await this.api
        .addBody(model.schema)
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
