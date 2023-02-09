import type { UsersController as BaseUsersController } from 'shared/types';

export class UsersController implements BaseUsersController {

  public static create(): UsersController {
    return new UsersController();
  }

}
