import type { ValidationError as JoiValidationError } from 'joi';

import type { Errors, ValidationService as BaseValidationService } from 'shared/types';
import { ValidationSchemaName } from 'shared/constants';
import { ValidationError } from 'shared/errors';
import { firstToUpperCase } from 'shared/utils';

import type { Schema } from './types';

export class ValidationService implements BaseValidationService {

  private constructor() {}

  public static create(): ValidationService {
    return new ValidationService();
  }

  public async validateToCreate<T>(schemaName: ValidationSchemaName, object: T): Promise<void> {
    await this.validate('schemaToCreate', schemaName, object);
  }

  public async validateToUpdate<T>(schemaName: ValidationSchemaName, object: T): Promise<void> {
    await this.validate('schemaToUpdate', schemaName, object);
  }

  private async validate<T, R extends keyof Schema<T>>(
    type: R,
    schemaName: ValidationSchemaName,
    object: T,
  ): Promise<void> {
    try {
      const schema: Schema<T> = await this.loadSchema(schemaName);
      await schema[type].validateAsync(object, { abortEarly: false });
    } catch (e: any) {
      this.parseValidationError(e, schemaName);
    }
  }

  private async loadSchema<T>(schemaName: ValidationSchemaName): Promise<Schema<T>> {
    switch (schemaName) {
      case ValidationSchemaName.LOGIN: {
        const { schema } = await import('services/validation/login-schema');

        return schema as Schema<T>;
      }
    }
  }

  private parseValidationError<T>({ details }: JoiValidationError, schemaName: ValidationSchemaName): void {
    const message: string = this.getErrorMessage(schemaName);
    const errors: Errors<T> = {};

    for (const { context, message } of details) {
      if (context && context.key) {
        errors[context.key as keyof T] = message;
      }
    }

    throw new ValidationError(message, errors);
  }

  private getErrorMessage(schemaName: ValidationSchemaName): string {
    return `${firstToUpperCase(schemaName)} schema validation error`;
  }

}