import Joi from 'joi';

import type { ValidationSchema } from 'shared/types';

import type { UserSchema } from '@admin/shared/types';

type Schema = Joi.ObjectSchema<UserSchema>;

const baseSchema: Schema = Joi.object({}); // @TODO: implements

const schemaToCreate: Schema = Joi.object({}); // @TODO: implements

const schemaToUpdate: Schema = Joi.object({}); // @TODO: implements

export const schema: ValidationSchema<Schema> = {
  schemaToCreate,
  schemaToUpdate,
};
