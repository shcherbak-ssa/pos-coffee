import fs from 'fs';
import { faker } from '@faker-js/faker';

import type { Address, Config, Product, User } from './shared/types';
import { SERVER_CONFIG_FILENAME, UserType } from './shared/constants';
import { generateRundomAvatar } from './shared/utils';

const adminUser: User = {
  name: 'Stanislav',
  surname: 'Shcherbakov',
  email: 'shcherbak.ssa@gmail.com',
  phone: '375333081037',
  password: 'qwerty1234',
  type: UserType.ADMIN,
  photo: generateRundomAvatar(),
  address: generateAddress(),
  isArchived: false,
};

run();

function run(): void {
  fs.writeFileSync(
    SERVER_CONFIG_FILENAME,
    JSON.stringify(generateConfig(), null, 2)
  );

  console.log('Generated!\n');
}

function generateConfig(): Config {
  return {
    users: [
      adminUser,
      generateUser('female', {}),
      generateUser('female', { type: UserType.MANAGER }),
      generateUser('male', { type: UserType.MANAGER }),
      generateUser('male', { type: UserType.MANAGER, photo: '', isArchived: true }),
      generateUser('male', { type: UserType.WAITER, photo: '', }),
      generateUser('female', { type: UserType.WAITER }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
      generateUser('female', { type: UserType.WAITER, photo: '', isArchived: true }),
      generateUser('female', { type: UserType.WAITER, photo: '', }),
      generateUser('female', { type: UserType.WAITER }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
    ],
    products: [
      // Coffee
      generateProduct({ photo: 'https://unsplash.com/photos/ZJJVZyedgH4' }),
      generateProduct({ photo: 'https://unsplash.com/photos/dQdyO9jsixA' }),
      generateProduct({ photo: 'https://unsplash.com/photos/9_Dollf_7aI' }),
      generateProduct({ photo: 'https://unsplash.com/photos/P9HWKYu2bQA', isArchived: true }),
      generateProduct({ photo: 'https://unsplash.com/photos/w17rvzEglgY' }),
      // Cappuccino
      generateProduct({ photo: 'https://unsplash.com/photos/0rI80lQco18' }),
      generateProduct({ photo: 'https://unsplash.com/photos/VCXk_bO97VQ' }),
      generateProduct({ isArchived: true }),
      generateProduct({ photo: 'https://unsplash.com/photos/hmLY7GiNFyE' }),
      generateProduct({ photo: 'https://unsplash.com/photos/tZKwLRO904E' }),
      // Tea
      generateProduct({ photo: 'https://unsplash.com/photos/XjkQouRM5Co' }),
      generateProduct({ photo: 'https://unsplash.com/photos/8yBQQqH3q8Q' }),
      generateProduct({ photo: 'https://unsplash.com/photos/EE6fFDyEtRc' }),
      generateProduct({ photo: 'https://unsplash.com/photos/eR3eB0D97_Q', isArchived: true }),
    ],
  };
}

function generateUser(
  gender: 'male' | 'female',
  { type = UserType.ADMIN, isArchived = false, photo = generateRundomAvatar() }: Partial<User>,
): User {
  const name: string = faker.name.firstName(gender);
  const surname: string = faker.name.lastName(gender);
  const email: string = faker.internet.email(name, surname);

  return {
    name, surname, email, type, isArchived, photo,
    phone: faker.phone.number('############'),
    password: faker.internet.password(10),
    address: generateAddress(),
  };
}

function generateAddress(): Address {
  return {
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    zipCode: faker.address.zipCode(),
    address: faker.address.streetAddress(true),
  };
}

function generateProduct({ photo = '', isArchived = false }: Partial<Product>): Product {
  const name: string = faker.commerce.productName();

  return {
    sku: name.toUpperCase().replace(/\s/g, '_'),
    price: Number(faker.commerce.price(1, 127)),
    photo,
    name,
    isArchived,
  };
}
