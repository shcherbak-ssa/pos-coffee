import Joi from 'joi';

import type { ProductVariantSchema, ValidationSchema } from 'shared/types';
import { ZERO } from 'shared/constants';

type Schema = Joi.ObjectSchema<ProductVariantSchema>;

const baseSchema: Schema = Joi.object({
  id: Joi.number(),
  sku: Joi.string().messages({
    'string.empty': 'Sku cannot be empty',
  }),
  name: Joi.string().messages({
    'string.empty': 'Name cannot be empty',
  }),
  price: Joi.number().min(ZERO).messages({
    'string.min': 'Price be zero or positive number',
    'string.empty': 'Price cannot be empty',
  }),
  stock: Joi.number().min(ZERO).empty(null).messages({
    'number.min': 'Stock must be zero or positive number',
  }),
  stockPerTime: Joi.number().less(Joi.ref('stock')).min(1).empty(null).messages({
    'number.min': 'Stock per time must be more than zero',
    'number.less': 'Stock per time must be less than stock value',
  }),
  stockAlert: Joi.number().less(Joi.ref('stock')).min(1).empty(null).messages({
    'number.min': 'Stock alert per time must be more than zero',
    'number.less': 'Stock alert must be less than stock value',
  }),
  useProductPrice: Joi.boolean(),
});

const schemaToCreate: Schema = baseSchema.keys({
  sku: baseSchema.extract('sku').required(),
  name: baseSchema.extract('name').required(),
});

const schemaToUpdate: Schema = baseSchema;

export const schema: ValidationSchema<Schema> = {
  toCreate: schemaToCreate,
  toUpdate: schemaToUpdate,
};
