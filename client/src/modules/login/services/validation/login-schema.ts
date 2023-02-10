import Joi from 'joi';

import type { LoginSchema } from 'modules/login/types';
import type { ValidationSchema } from 'shared/types';

type Schema = Joi.ObjectSchema<LoginSchema>;

const loginSchema: Schema = Joi.object({
  username: Joi.string().min(8).required().messages({
    'string.min': 'Username must be at least 8 characters',
    'string.empty': 'Username cannot be empty',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password cannot be empty',
  }),
});

export const schema: ValidationSchema<Schema> = {
  schemaToCreate: loginSchema,
  schemaToUpdate: loginSchema,
};
