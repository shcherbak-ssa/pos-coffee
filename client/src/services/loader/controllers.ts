import type { Controller } from 'shared/types';
import { ControllerName } from 'shared/constants';

export async function loadController(name: ControllerName): Promise<Controller> {
  switch (name) {
    case ControllerName.LOGIN: {
      const { LoginController } = await import('controllers/login');

      return LoginController.create();
    }
    case ControllerName.USERS: {
      const { UsersController } = await import('controllers/users');

      return UsersController.create();
    }
  }
}
