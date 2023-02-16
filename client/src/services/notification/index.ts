import type { ErrorHandler, ErrorObject, Notification, NotificationHandler, NotificationService as BaseNotificationService } from 'shared/types';
import type { ErrorType } from 'shared/constants';

export class NotificationService implements BaseNotificationService {

  private static service: NotificationService;
  private errorHandlers: Map<ErrorType, ErrorHandler<object>[]>;
  private notificationHandlers: NotificationHandler[];

  private constructor() {
    this.errorHandlers = new Map([]);
    this.notificationHandlers = [];
  }

  public static create(): NotificationService {
    if (!NotificationService.service) {
      NotificationService.service = new NotificationService();
    }

    return NotificationService.service;
  }

  public addNotification(notification: Notification): void {
    this.notificationHandlers.forEach((handler) => handler(notification));
  }

  public subscribeToNotification(handler: NotificationHandler): void {
    if (!this.notificationHandlers.includes(handler)) {
      this.notificationHandlers.push(handler);
    }
  }

  public unsubscribeFromNoification(handlerToRemove: NotificationHandler): void {
    this.notificationHandlers = this.notificationHandlers.filter((handler) => handler !== handlerToRemove);
  }

  public addError<T>(error: ErrorObject<T>): void {
    const handlers: ErrorHandler<object>[] | undefined = this.errorHandlers.get(error.type);

    if (handlers) {
      handlers.forEach((handler) => handler(error));
    }
  }

  public subscribeToError<T>(errorType: ErrorType, handler: ErrorHandler<T>): void {
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

  public unsubscribeFromError<T>(errorType: ErrorType, handlerToRemove: ErrorHandler<T>): void {
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
