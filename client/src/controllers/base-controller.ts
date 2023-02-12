import type {
  Controller,
  ApiService as BaseApiService,
  ValidationService as BaseValidationService,
} from 'shared/types';
import { ApiService } from 'services/api';
import { ValidationService } from 'services/validation';

export class BaseController implements Controller {

  protected api: BaseApiService;
  protected validation: BaseValidationService;

  protected constructor() {
    this.api = ApiService.create();
    this.validation = ValidationService.create();
  }

}
