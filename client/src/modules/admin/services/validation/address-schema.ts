import Joi from 'joi';

import type { AddressSchema } from 'shared/types';

type Schema = Joi.ObjectSchema<AddressSchema>;

export const addressSchema: Schema = Joi.object({
  id: Joi.number(),
  country: Joi.string().messages({
    'string.empty': 'Country cannot be empty',
  }),
  state: Joi.string().messages({
    'string.empty': 'State cannot be empty',
  }),
  city: Joi.string().messages({
    'string.empty': 'City cannot be empty',
  }),
  zipCode: Joi.string().messages({
    'string.empty': 'Zip code cannot be empty',
  }),
  address: Joi.string().messages({
    'string.empty': 'Address cannot be empty',
  }),
});

export function addressSchemaToCreate(): Schema {
  return addressSchema.keys({
    country: addressSchema.extract('country').required(),
    state: addressSchema.extract('state').required(),
    city: addressSchema.extract('city').required(),
    zipCode: addressSchema.extract('zipCode').required(),
    address: addressSchema.extract('address').required(),
  });
}
