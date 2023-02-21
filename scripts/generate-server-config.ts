import fs from 'fs';
import { faker } from '@faker-js/faker';

import type { Address, Category, Config, Product, ProductVariant, User } from './shared/types';
import { EMPTY_STRING, SERVER_CONFIG_FILENAME, UserType } from './shared/constants';
import { generateRundomAvatar, getSku } from './shared/utils';

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
      generateCategory({ name: 'DEFAULT' }),
      generateCategory({ name: 'Coffee bar' }),
      generateCategory({ name: 'Drinks' }),
      generateCategory({ name: 'Strongdrink' }),
      generateCategory({ name: 'Shorts', isArchived: true  }),
      generateCategory({ name: 'Food' }),
      generateCategory({ name: 'Tea', isAvailable: false }),
    ],
    // @TODO: refactor
    products: [
      // Coffee bar
      generateProduct({ name: 'Caffe', category: 2 }),
      generateProduct({ name: 'Cappuccino', category: 2 }),
      generateProduct({ name: 'Hot chocolate', category: 2 }),
      generateProduct({ name: 'Tea', category: 2 }),
      // Drinks
      generateProduct({ name: 'Coca-Cola', category: 3 }),
      generateProduct({ name: 'Coca-Cola Zero', category: 3 }),
      generateProduct({ name: 'Fanta', category: 3 }),
      generateProduct({ name: 'Sprite', category: 3 }),
      generateProduct({ name: 'Pepsi', category: 3 }),
      generateProduct({ name: 'Water (Gas)', category: 3 }),
      generateProduct({ name: 'Water (Still)', category: 3 }),
      // Strongdrink
      generateProduct({ name: 'Beer', category: 4 }),
      generateProduct({ name: 'Wine', category: 4 }),
      generateProduct({ name: 'Whiskey', category: 4 }),
      generateProduct({ name: 'Cognac', category: 4 }),
      generateProduct({ name: 'Rum', category: 4 }),
      generateProduct({ name: 'Vodka', category: 4 }),
      // Food
      generateProduct({ name: 'Cake', category: 6 }),
      generateProduct({ name: 'Toast', category: 6 }),
      generateProduct({ name: 'Focaccia', category: 6 }),
      generateProduct({ name: 'Hot Dog', category: 6 }),
      generateProduct({ name: 'Hamburger', category: 6 }),
    ],
    productVariants: [
      generateProductVariant({ name: 'Expressed', product: 1 }),
      generateProductVariant({ name: 'Double coffee', product: 1 }),
      generateProductVariant({ name: 'American coffee', product: 1 }),
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
  name = faker.commerce.productName(),
  category = 1,
  image = EMPTY_STRING,
  isAvailable = true,
  isArchived = false,
}: Partial<Product>): Product {
  return {
    sku: getSku(name),
    price: Number(faker.commerce.price(1, 200)),
    image,
    name,
    category,
    isAvailable,
    isArchived,
  };
}

function generateProductVariant({
  name = faker.commerce.productName(),
  useProductPrice = false,
  product = 1,
}: Partial<ProductVariant>): ProductVariant {
  return {
    sku: getSku(name),
    price: Number(faker.commerce.price(1, 200)),
    useProductPrice,
    name,
    product,
  };
}
