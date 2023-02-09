import type Joi from 'joi';

export type Schema<T> = {
  schemaToCreate: Joi.ObjectSchema<T>;
  schemaToUpdate: Joi.ObjectSchema<T>;
}
