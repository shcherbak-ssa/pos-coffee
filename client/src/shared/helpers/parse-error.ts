import type { NotificationService as BaseNotificationService } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { ApiError, AuthError, ValidationError } from 'shared/errors';
import { NotificationService } from 'services/notification';

export function parseError(e: Error): void {
  if (e instanceof AuthError) {
    import('shared/helpers/to-login')
      .then(({ toLogin }) => {
        toLogin();
      });

    return;
  }

  const notificationService: BaseNotificationService = NotificationService.create();

  if (e instanceof ValidationError) {
    notificationService.addError({
      type: ErrorType.VALIDATION,
      message: e.message,
      errors: e.errors,
    });

    return;
  }

  if (e instanceof ApiError) {
    notificationService.addError(e.error);
    return;
  }

  console.error(e);
}
