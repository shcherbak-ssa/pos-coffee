import Joi from 'joi';

import type { ProductSchema, ValidationSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

type Schema = Joi.ObjectSchema<ProductSchema>;

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
  stock: Joi.number().min(ZERO).messages({
    'number.min': 'Stock must be zero or positive number',
  }),
  stockPerTime: Joi.number().less(Joi.ref('stock')).min(1).messages({
    'number.min': 'Stock per time must be more than zero',
    'number.less': 'Stock per time must be less than stock value',
  }),
  stockAlert: Joi.number().less(Joi.ref('stock')).min(1).messages({
    'number.min': 'Stock alert per time must be more than zero',
    'number.less': 'Stock per time must be less than stock value',
  }),
  image: Joi.string().empty(EMPTY_STRING),
  category: Joi.object({
    id: Joi.number().invalid(ZERO),
    name: Joi.string(),
  }).messages({
    'number.invalid': 'Category is required',
  }),
  useStockForVariants: Joi.boolean(),
  isAvailable: Joi.boolean(),
});

const schemaToCreate: Schema = baseSchema.keys({
  sku: baseSchema.extract('sku').required(),
  name: baseSchema.extract('name').required(),
  price: baseSchema.extract('price').required(),
});

const schemaToUpdate: Schema = baseSchema;

export const schema: ValidationSchema<Schema> = {
  toCreate: schemaToCreate,
  toUpdate: schemaToUpdate,
};
