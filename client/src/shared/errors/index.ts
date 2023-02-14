import type { ErrorObject, Errors } from 'shared/types';
import { ErrorName } from 'shared/constants';

export class AppError extends Error {
  public name: string = ErrorName.APP_ERROR;

  public constructor(message: string) {
    super(message);
  }
}

export class AuthError extends Error {
  public name: string = ErrorName.AUTH_ERROR;

  public constructor(message: string) {
    super(message);
  }
}

export class ApiError<T> extends Error {
  public name: string = ErrorName.API_ERROR;
  public error: ErrorObject<T>;

  public constructor(error: ErrorObject<T>) {
    super(error.message);
    this.error = error;
  }
}

export class ValidationError<T> extends Error {
  public name: string = ErrorName.VALIDATION_ERROR;
  public errors: Errors<T>;

  public constructor(message: string, errors: Errors<T>) {
    super(message);
    this.errors = errors;
  }
}

export class ProgerError extends Error {
  public name: string = ErrorName.PROGER_ERROR;

  public constructor(message: string) {
    super(message);
  }
}
