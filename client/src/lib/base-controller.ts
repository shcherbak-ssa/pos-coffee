import type {
  Controller,
  ApiService as BaseApiService,
  ValidationService as BaseValidationService,
  NotificationService as BaseNotificationService,
  Store,
} from 'shared/types';
import { EntityName, ErrorType } from 'shared/constants';
import { Context } from 'shared/context';
import { ApiError, AppError, AuthError, ValidationError } from 'shared/errors';

export class BaseController implements Controller {

  protected constructor(
    private storeName: string,
    protected entityName: EntityName,
  ) {}

  protected async getStore(storeName: string = this.storeName): Promise<Store> {
    await Context.loadStore(storeName);

    return Context.getStore(storeName);
  }

  protected async getApiService(): Promise<BaseApiService> {
    const { ApiService } = await import('services/api');

    return ApiService.create();
  }

  protected async getValidationService(): Promise<BaseValidationService> {
    const { ValidationService } = await import('services/validation');

    return ValidationService.create();
  }

  protected async getNotificationService(): Promise<BaseNotificationService> {
    const { NotificationService } = await import('services/notification');

    return NotificationService.create();
  }

  protected async parseError(e: Error): Promise<void> {
    if (e instanceof AuthError) {
      import('shared/helpers/to-login')
        .then(({ toLogin }) => {
          toLogin();
        });

      return;
    }

    if (e instanceof ValidationError) {
      const notificationService: BaseNotificationService = await this.getNotificationService();

      notificationService.addError({
        type: ErrorType.VALIDATION,
        message: e.message,
        errors: e.errors,
        entityName: this.entityName,
      });

      return;
    }

    if (e instanceof ApiError) {
      const notificationService: BaseNotificationService = await this.getNotificationService();

      notificationService.addError(e.error);
      return;
    }

    if (e instanceof AppError) {
      const notificationService: BaseNotificationService = await this.getNotificationService();

      notificationService.addNotification({
        type: 'result',
        severity: 'error',
        heading: e.heading,
        message: e.message,
      });

      return;
    }

    console.error(e);
  }

}
