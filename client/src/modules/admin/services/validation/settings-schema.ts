import Joi from 'joi';

import type { SettingsSchema, ValidationSchema } from 'shared/types';
import { Currency } from 'shared/constants';

type Schema = Joi.ObjectSchema<SettingsSchema>;

const baseSchema: Schema = Joi.object({
  id: Joi.number(),
  currency: Joi.string().valid(
    Currency.EUR,
    Currency.USD,
  ).messages({
    'any.invalid': 'Currency is invalid',
  }),
  taxes: Joi.number().min(0).max(100).messages({
    'number.min': 'Taxes must be between 0 and 100',
    'number.max': 'Taxes must be between 0 and 100',
  }),
});

export const schema: ValidationSchema<Schema> = {
  toCreate: baseSchema,
  toUpdate: baseSchema,
};

