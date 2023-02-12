import type { User as BaseUser, UserSchema, UsersController as BaseUsersController } from 'shared/types';
import { parseError } from 'shared/helpers/parse-error';
import { BaseController } from 'controllers/base-controller';
import { ApiEndpoint } from 'shared/constants';

export class UsersController extends BaseController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
  }

  public async getCurrentUser(): Promise<BaseUser> {
    throw new Error('');
    try {
      const userSchema: UserSchema = await this.api.get(ApiEndpoint.USERS);

    } catch (e: any) {
      parseError(e);
    }
  }

}
