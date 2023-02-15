import type {
  Controller,
  ApiService as BaseApiService,
  ValidationService as BaseValidationService,
  NotificationService as BaseNotificationService,
} from 'shared/types';

export class BaseController implements Controller {

  protected constructor() {}

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

}
