import type { ErrorHandler, ErrorObject, ErrorService as BaseErrorService } from 'shared/types';
import type { ErrorType } from 'shared/constants';

export class ErrorService implements BaseErrorService {

  private static service: ErrorService;
  private errorHandlers: Map<ErrorType, ErrorHandler<object>[]>;

  private constructor() {
    this.errorHandlers = new Map([]);
  }

  public static create(): ErrorService {
    if (!ErrorService.service) {
      ErrorService.service = new ErrorService();
    }

    return ErrorService.service;
  }

  public addError<T>(error: ErrorObject<T>): void {
    const handlers: ErrorHandler<object>[] | undefined = this.errorHandlers.get(error.type);

    if (handlers) {
      handlers.forEach((handler) => handler(error));
    }
  }

  public subscribe<T>(errorType: ErrorType, handler: ErrorHandler<T>): void {
    const handlers: ErrorHandler<object>[] | undefined = this.errorHandlers.get(errorType);
    const newHandlers: ErrorHandler<object>[] = [];

    if (handlers) {
      newHandlers.push(...handlers);
    }

    if (!newHandlers.includes(handler)) {
      newHandlers.push(handler);
    }

    this.errorHandlers.set(errorType, newHandlers);
  }

  public unsubscribe<T>(errorType: ErrorType, handlerToRemove: ErrorHandler<T>): void {
    const handlers: ErrorHandler<object>[] | undefined = this.errorHandlers.get(errorType);
    const newHandlers: ErrorHandler<object>[] = [];

    if (handlers) {
      newHandlers.push(
        ...handlers.filter((handler) => handler !== handlerToRemove)
      );
    }

    this.errorHandlers.set(errorType, newHandlers);
  }

}
