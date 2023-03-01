import type { ApiService, Token, ValidationService } from 'shared/types';
import { EMPTY_STRING, EntityName, LocalStorageKey, ROOT_PAGE_PATH } from 'shared/constants';
import { replaceLocation } from 'shared/utils/replace-location';
import { LocalStorage } from 'shared/helpers/local-storage';
import { BaseController } from 'lib/base-controller';

import type { LoginController as BaseLoginController, LoginSchema } from '@login/shared/types';
import { LOGIN_API_ENDPOINT, LOGIN_VALIDATION } from '@login/shared/constants';

export class LoginController extends BaseController implements BaseLoginController {

  public static create(): LoginController {
    return new LoginController(EMPTY_STRING, EntityName.ANY);
  }

  public async processLogin(schema: LoginSchema): Promise<void> {
    try {
      const validationService: ValidationService = await this.getValidationService();
      await validationService.validateToCreate(LOGIN_VALIDATION, schema);

      const apiService: ApiService = await this.getApiService();
      const token: Token = await apiService
        .addBody(schema)
        .post(LOGIN_API_ENDPOINT);

      LocalStorage.set(LocalStorageKey.USER_TOKEN, token);

      this.redirectToLastUrl();
    } catch (e: any) {
      await this.parseError(e);
    }
  }

  private redirectToLastUrl(): void {
    const lastUrl: string | null = LocalStorage.get(LocalStorageKey.LAST_URL);
    LocalStorage.remove(LocalStorageKey.LAST_URL);

    replaceLocation(lastUrl || ROOT_PAGE_PATH);
  }

}
