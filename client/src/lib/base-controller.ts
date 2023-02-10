import type {
  Controller,
  ApiService as BaseApiService,
  ErrorService as BaseErrorService,
  ValidationService as BaseValidationService,
} from 'shared/types';
import { ErrorType } from 'shared/constants';
import { ApiError, ValidationError } from 'shared/errors';
import { ApiService } from 'services/api';
import { ErrorService } from 'services/error';
import { ValidationService } from 'services/validation';

export class BaseController implements Controller {

  protected api: BaseApiService;
  protected validation: BaseValidationService;

  protected constructor() {
    this.api = ApiService.create();
    this.validation = ValidationService.create();
  }

  protected parseError(e: Error): void {
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

}
