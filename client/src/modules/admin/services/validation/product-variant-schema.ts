import Joi from 'joi';

import type { ProductVariantSchema, ValidationSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

type Schema = Joi.ObjectSchema<ProductVariantSchema>;

const baseSchema: Schema = Joi.object({
  id: Joi.number(),
  sku: Joi.string().messages({
    'string.empty': 'Sku cannot be empty',
  }),
  name: Joi.string().messages({
    'string.empty': 'Name cannot be empty',
  }),
  price: Joi.number().min(ZERO).max(200).messages({
    'string.min': 'Price must be between 0 and 127',
    'string.max': 'Price must be between 0 and 127',
    'string.empty': 'Price cannot be empty',
  }),
  stock: Joi.number(),
  stockPerTime: Joi.number(),
  useProductPrice: Joi.boolean(),
});

const schemaToCreate: Schema = baseSchema.keys({
  sku: baseSchema.extract('sku').required(),
  name: baseSchema.extract('name').required(),
});

const schemaToUpdate: Schema = baseSchema.keys();

export const schema: ValidationSchema<Schema> = {
  toCreate: schemaToCreate,
  toUpdate: schemaToUpdate,
};
