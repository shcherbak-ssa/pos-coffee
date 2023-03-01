import type Joi from 'joi';
import type { ValidationError as JoiValidationError } from 'joi';

import type {
  AnyType,
  Errors,
  ValidationSchema,
  ValidationService as BaseValidationService,
  ValidationType,
} from 'shared/types';
import { ValidationError } from 'shared/errors';
import { Context } from 'shared/context';
import { removeUntrackedFields } from 'shared/utils/untracked-fields';

type Schema<T> = {
  [key in ValidationType]: Joi.ObjectSchema<T>;
}

export class ValidationService implements BaseValidationService {

  private constructor() {}

  public static create(): ValidationService {
    return new ValidationService();
  }

  public async validate<T>(type: ValidationType, schemaName: string, object: T): Promise<void> {
    try {
      const updates: AnyType = removeUntrackedFields(object as AnyType);

      const schema: Schema<T> = await this.loadSchema(schemaName);
      await schema[type].validateAsync(updates, { abortEarly: false });
    } catch (e: any) {
      this.parseValidationError(e, schemaName);
    }
  }

  public async validateToCreate<T>(schemaName: string, object: T): Promise<void> {
    await this.validate('toCreate', schemaName, object);
  }

  public async validateToUpdate<T>(schemaName: string, object: T): Promise<void> {
    await this.validate('toUpdate', schemaName, object);
  }

  public async loadSchema<T>(schemaName: string): Promise<Schema<T>> {
    const schema: ValidationSchema<T> = await Context.getLoader().loadValidationSchema(schemaName);

    return schema as Schema<T>;
  }

  private parseValidationError<T>({ details }: JoiValidationError, schemaName: string): void {
    const message: string = this.getErrorMessage(schemaName);
    const errors: Errors<T> = {};

    for (const { context, message } of details) {
      if (context && context.key) {
        errors[context.key as keyof T] = message;
      }
    }

    throw new ValidationError(message, errors);
  }

  private getErrorMessage(schemaName: string): string {
    return `Invalid ${schemaName.toLowerCase()} schema`;
  }

}
