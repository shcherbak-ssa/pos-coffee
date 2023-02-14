import type { ErrorService as BaseErrorService } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { ApiError, AuthError, ValidationError } from 'shared/errors';
import { ErrorService } from 'services/error';

export function parseError(e: Error): void {
  if (e instanceof AuthError) {
    import('shared/helpers/to-login')
      .then(({ toLogin }) => {
        toLogin();
      });

    return;
  }

  const errorService: BaseErrorService = ErrorService.create();

  if (e instanceof ValidationError) {
    errorService.addError({
      type: ErrorType.VALIDATION,
      message: e.message,
      errors: e.errors,
    });

    return;
  }

  if (e instanceof ApiError) {
    errorService.addError(e.error);
    return;
  }

  console.error(e);
}
