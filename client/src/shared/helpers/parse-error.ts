import type { ErrorService as BaseErrorService } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { ApiError, AuthError, ValidationError } from 'shared/errors';
import { toLogin } from 'shared/helpers/to-login';
import { ErrorService } from 'services/error';

export function parseError(e: Error): void {
  if (e instanceof AuthError) {
    toLogin();
    return;
  }

  const errorService: BaseErrorService = ErrorService.create();

  if (e instanceof ApiError) {
    errorService.addError(e.error);
    return;
  }

  if (e instanceof ValidationError) {
    errorService.addError({
      type: ErrorType.VALIDATION,
      message: e.message,
      errors: e.errors,
    });

    return;
  }

  console.log(e);
}
