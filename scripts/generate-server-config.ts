import fs from 'fs';
import { faker } from '@faker-js/faker';

import type { Address, Category, Config, Order, OrderLine, Product, ProductVariant, User } from './shared/types';
import { EMPTY_STRING, SERVER_CONFIG_FILENAME, UserType } from './shared/constants';
import { generatePrice, generateRundomAvatar, getSku } from './shared/utils';

const adminUser: User = {
  name: 'Admin',
  surname: 'Adminovic',
  email: 'admin@gmail.com',
  phone: '375333081037',
  password: 'qwerty1234',
  type: UserType.ADMIN,
  image: generateRundomAvatar(),
  address: generateAddress(),
  isArchived: false,
};

const managerUser: User = {
  name: 'Manager',
  surname: 'Managerkov',
  email: 'manager@gmail.com',
  phone: '375333081037',
  password: 'qwerty1234',
  type: UserType.MANAGER,
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
      managerUser,
      generateUser('female', {}),
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
      generateCategory({ name: 'Shorts', isAvailable: false  }),
      generateCategory({ name: 'Food' }),
      generateCategory({ name: 'Tea', isAvailable: false }),
    ],
    // @TODO: refactor
    products: [
      // Coffee bar
      generateProduct({ name: 'Coffee', category: 2, stock: 10000, useStockForVariants: true, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Cappuccino', category: 2, image: 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
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
      // Caffee
      generateProductVariant({ name: 'Expresso', product: 1, stockPerTime: 20 }),
      generateProductVariant({ name: 'Double', product: 1, stockPerTime: 20 }),
      generateProductVariant({ name: 'American', product: 1, stockPerTime: 20 }),
      // Tea
      generateProductVariant({ name: 'Green', product: 4 }),
      generateProductVariant({ name: 'Black', product: 4 }),
    ],
    orders: [
      generateOrder({ lines: [1], user: 3 }),
      generateOrder({ lines: [2], user: 5 }),
      generateOrder({ lines: [3, 4, 5], user: 3 }),
      generateOrder({ lines: [6], user: 4 }),
    ],
    orderLines: [
      generateOrderLine({ count: 2, product: 1, variant: 1 }),
      generateOrderLine({ count: 1, product: 1, variant: 3 }),
      generateOrderLine({ count: 1, product: 4, variant: 5 }),
      generateOrderLine({ count: 2, product: 1, variant: 2 }),
      generateOrderLine({ count: 1, product: 1, variant: 3 }),
      generateOrderLine({ count: 3, product: 4, variant: 4 }),
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
}: Partial<Category>): Category {
  return {
    name,
    isAvailable,
  };
}

function generateProduct({
  name = faker.commerce.productName(),
  category = 1,
  image = EMPTY_STRING,
  useStockForVariants = false,
  isAvailable = true,
  isArchived = false,
}: Partial<Product>): Product {
  return {
    sku: getSku(name),
    price: generatePrice(),
    stock: Number(faker.random.numeric(2)),
    image,
    name,
    category,
    useStockForVariants,
    isAvailable,
    isArchived,
  };
}

function generateProductVariant({
  name = faker.commerce.productName(),
  stock = Number(faker.random.numeric(2)),
  stockPerTime = 1,
  useProductPrice = false,
  product = 1,
}: Partial<ProductVariant>): ProductVariant {
  return {
    sku: getSku(name),
    price: generatePrice(),
    stock,
    stockPerTime,
    useProductPrice,
    name,
    product,
  };
}

function generateOrder({ lines = [], user = 3 }: Partial<Order>): Order {
  return {
    lines,
    user,
  };
}

function generateOrderLine({ count = 1, product = 1, variant = 1 }: Partial<OrderLine>): OrderLine {
  return {
    count,
    product,
    variant,
  };
}
