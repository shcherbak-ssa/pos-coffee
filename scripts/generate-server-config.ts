import fs from 'fs';
import { faker } from '@faker-js/faker';

import type { Address, Category, Config, Product, User } from './shared/types';
import { EMPTY_STRING, SERVER_CONFIG_FILENAME, UserType } from './shared/constants';
import { generateRundomAvatar } from './shared/utils';

const adminUser: User = {
  name: 'Stanislav',
  surname: 'Shcherbakov',
  email: 'shcherbak.ssa@gmail.com',
  phone: '375333081037',
  password: 'qwerty1234',
  type: UserType.ADMIN,
  image: generateRundomAvatar(),
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
      generateUser('male', { type: UserType.MANAGER, image: EMPTY_STRING, isArchived: true }),
      generateUser('male', { type: UserType.WAITER, image: EMPTY_STRING, }),
      generateUser('female', { type: UserType.WAITER }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
      generateUser('female', { type: UserType.WAITER, image: EMPTY_STRING, isArchived: true }),
      generateUser('female', { type: UserType.WAITER, image: EMPTY_STRING, }),
      generateUser('female', { type: UserType.WAITER }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
    ],
    categories: [
      generateCategory({ name: 'Coffee bar' }),
      generateCategory({ name: 'Drinks' }),
      generateCategory({ name: 'Strongdrink' }),
      generateCategory({ name: 'Tea', isArchived: true }),
      generateCategory({ name: 'Shorts' }),
      generateCategory({ name: 'Sandwiches' }),
      generateCategory({ name: 'Test category', isAvailable: false }),
    ],
    // @TODO: refactor
    products: [
      // Coffee
      generateProduct({ image: 'https://images.unsplash.com/photo-1580600160741-4556fe4413b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1544787219-2c5077fcfcf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80', isAvailable: false }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1559275117-d096eb5d85b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80', isArchived: true }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1458819757519-7581bade511d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80' }),
      // Cappuccino
      generateProduct({ image: 'https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ isArchived: true }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1413745094207-a01b234cc32f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80', isAvailable: false }),
      // Tea
      generateProduct({ image: 'https://images.unsplash.com/photo-1605773202042-63ef5f7f5883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1594136604897-29f7e564db27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' }),
      generateProduct({ image: 'https://images.unsplash.com/photo-1610823455970-fa109c9cb643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', isArchived: true }),
    ],
  };
}

function generateUser(
  gender: 'male' | 'female',
  { type = UserType.ADMIN, isArchived = false, image: photo = generateRundomAvatar() }: Partial<User>,
): User {
  const name: string = faker.name.firstName(gender);
  const surname: string = faker.name.lastName(gender);
  const email: string = faker.internet.email(name, surname);

  return {
    name, surname, email, type, isArchived, image: photo,
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

function generateCategory({
  name = EMPTY_STRING,
  isAvailable = true,
  isArchived = false,
}: Partial<Category>): Category {
  return {
    name,
    isAvailable,
    isArchived,
  };
}

function generateProduct({
  image: photo = EMPTY_STRING,
  isAvailable = true,
  isArchived = false,
}: Partial<Product>): Product {
  const name: string = faker.commerce.productName();

  return {
    sku: name.toUpperCase().replace(/\s/g, '_'),
    price: Number(faker.commerce.price(1, 127)),
    image: photo,
    name,
    isAvailable,
    isArchived,
  };
}
