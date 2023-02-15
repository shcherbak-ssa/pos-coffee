import Joi from 'joi';

import type { ValidationSchema } from 'shared/types';
import { UserType } from 'shared/constants';

import type { UserSchema } from '@admin/shared/types';

type Schema = Joi.ObjectSchema<UserSchema>;

const baseSchema: Schema = Joi.object({
  id: Joi.number(),
  name: Joi.string().messages({
    'string.empty': 'Name cannot be empty',
  }),
  surname: Joi.string().messages({
    'string.empty': 'Surname cannot be empty',
  }),
  email: Joi.string().email({ tlds: false }).messages({
    'string.email': 'Email is invalid',
    'string.empty': 'Email cannot be empty',
  }),
  phone: Joi.string().length(12).pattern(/\d{12}/).messages({
    'string.length': 'Phone number must contain 12 digits',
    'string.empty': 'Phone cannot be empty',
  }),
  type: Joi.string().valid(
    UserType.ADMIN,
    UserType.MANAGER,
    UserType.WAITER,
  ).messages({
    'any.invalid': 'Type is invalid',
    'string.empty': 'Type cannot be empty',
  }),
  isDeleted: Joi.boolean(),
});

const schemaToCreate: Schema = baseSchema.keys({
  name: baseSchema.extract('name').required(),
  surname: baseSchema.extract('surname').required(),
  email: baseSchema.extract('email').required(),
  phone: baseSchema.extract('phone').required(),
  type: baseSchema.extract('type').required(),
});

const schemaToUpdate: Schema = baseSchema.keys();

export const schema: ValidationSchema<Schema> = {
  schemaToCreate,
  schemaToUpdate,
};
