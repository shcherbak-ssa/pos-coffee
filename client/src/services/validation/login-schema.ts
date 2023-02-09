import Joi from 'joi';
import type { LoginSchema } from 'shared/types';
import type { Schema } from './types';

const loginSchema: Joi.ObjectSchema<LoginSchema> = Joi.object({
  username: Joi.string().min(8).required().messages({
    'string.min': 'Username must be at least 8 characters',
    'string.empty': 'Username cannot be empty',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password cannot be empty',
  }),
});

export const schema: Schema<LoginSchema> = {
  schemaToCreate: loginSchema,
  schemaToUpdate: loginSchema,
};
