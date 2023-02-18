import Joi from 'joi';

import type { ProductSchema, ValidationSchema } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';

type Schema = Joi.ObjectSchema<ProductSchema>;

const baseSchema: Schema = Joi.object({
  id: Joi.number(),
  sku: Joi.string().messages({
    'string.empty': 'Sku cannot be empty',
  }),
  name: Joi.string().messages({
    'string.empty': 'Name cannot be empty',
  }),
  price: Joi.number().min(0).max(127).messages({
    'string.min': 'Price must be between 0 and 127',
    'string.max': 'Price must be between 0 and 127',
    'string.empty': 'Phone cannot be empty',
  }),
  photo: Joi.string().empty(EMPTY_STRING),
  isArchived: Joi.boolean(),
});

const schemaToCreate: Schema = baseSchema.keys({
  sku: baseSchema.extract('sku').required(),
  name: baseSchema.extract('name').required(),
  price: baseSchema.extract('price').required(),
});

const schemaToUpdate: Schema = baseSchema.keys();

export const schema: ValidationSchema<Schema> = {
  toCreate: schemaToCreate,
  toUpdate: schemaToUpdate,
};
