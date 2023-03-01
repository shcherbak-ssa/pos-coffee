import Joi from 'joi';

import type { CategorySchema, ValidationSchema } from 'shared/types';

type Schema = Joi.ObjectSchema<CategorySchema>;

const baseSchema: Schema = Joi.object({
  id: Joi.number(),
  name: Joi.string().messages({
    'string.empty': 'Name cannot be empty',
  }),
  productsCount: Joi.number(),
  isAvailable: Joi.boolean(),
  isArchived: Joi.boolean(),
});

const schemaToCreate: Schema = baseSchema.keys({
  name: baseSchema.extract('name').required(),
});

const schemaToUpdate: Schema = baseSchema;

export const schema: ValidationSchema<Schema> = {
  toCreate: schemaToCreate,
  toUpdate: schemaToUpdate,
};
