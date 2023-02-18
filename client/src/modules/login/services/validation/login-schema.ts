import Joi from 'joi';

import type { ValidationSchema } from 'shared/types';

import type { LoginSchema } from '@login/shared/types';

type Schema = Joi.ObjectSchema<LoginSchema>;

const loginSchema: Schema = Joi.object({
  email: Joi.string().min(8).required().messages({
    'string.min': 'Email must be at least 8 characters',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password cannot be empty',
  }),
});

export const schema: ValidationSchema<Schema> = {
  toCreate: loginSchema,
  toUpdate: loginSchema,
};
