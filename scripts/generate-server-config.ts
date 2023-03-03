import fs from 'fs';
import { faker } from '@faker-js/faker';

import type { Address, Category, Config, Order, OrderLine, Product, ProductVariant, User } from './shared/types';
import { Currency, DAYS, DAY_MILLISECONDS, EMPTY_STRING, SERVER_CONFIG_FILENAME, UserType } from './shared/constants';
import {
  createArray,
  generateOrderLineCount,
  generatePrice,
  generateRandomAvatar,
  getNextOrderMilliseconds,
  getPaymentMethod,
  getRandomNumber,
  getSku,
  getUserOrdersCountAndId,
  getWorkStartDate,
} from './shared/utils';

const adminUser: User = {
  name: 'Admin',
  surname: 'Adminovic',
  email: 'admin@gmail.com',
  phone: '375333081037',
  password: 'qwerty1234',
  type: UserType.ADMIN,
  image: generateRandomAvatar(),
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
  image: generateRandomAvatar(),
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
  const config: Config = {
    settings: {
      currency: Currency.EUR,
      taxes: 5,
    },
    users: [
      adminUser,
      managerUser,
      generateUser('female', {}),
      generateUser('male', { type: UserType.MANAGER }),
      /* 5 */generateUser('male', { type: UserType.MANAGER, isArchived: true }),
      generateUser('male', { type: UserType.WAITER, }),
      generateUser('female', { type: UserType.WAITER }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
      generateUser('female', { type: UserType.WAITER, isArchived: true }),
      /* 10 */generateUser('female', { type: UserType.WAITER, }),
      generateUser('female', { type: UserType.WAITER }),
      generateUser('male', { type: UserType.WAITER, isArchived: true }),
      generateUser('male', { type: UserType.WAITER, }),
      generateUser('female', { type: UserType.WAITER }),
    ],
    categories: [
      generateCategory({ name: 'DEFAULT' }),
      generateCategory({ name: 'Coffee bar' }),
      generateCategory({ name: 'Drinks' }),
      generateCategory({ name: 'Strongdrink' }),
      generateCategory({ name: 'Shots'  }),
      generateCategory({ name: 'Food' }),
      generateCategory({ name: 'Tea', isAvailable: false }),
    ],
    products: [
      // Coffee bar
      generateProduct({ name: 'Coffee', category: 2, price: 1.00, stock: 10000, stockPerTime: 7, stockAlert: 100, image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Cappuccino', category: 2, price: 2.50, stock: 1000, stockPerTime: 7, stockAlert: 50, image: 'https://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Hot Choc.', category: 2, price: 2.50, stock: 1000, stockPerTime: 10, stockAlert: 50, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90JTIwY2hvY29sYXRlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60' }),
      generateProduct({ name: 'Macchiato', category: 2, isAvailable: false, price: 2.50, stock: 1000, stockPerTime: 10, stockAlert: 50 }),
      generateProduct({ name: 'Tea', category: 2, price: 2.00, stock: 0, stockAlert: 10, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      // Drinks
      generateProduct({ name: 'Coca-Cola', category: 3, price: 2.50, stock: 0, stockAlert: 20, image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Fanta', category: 3, price: 2.50, stockAlert: 20, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=503&q=80' }),
      generateProduct({ name: 'Sprite', category: 3, price: 2.50, stockAlert: 20, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Pepsi', category: 3, price: 2.50, stockAlert: 20, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=929&q=80' }),
      generateProduct({ name: 'Water', category: 3, price: 1.50, image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80' }),
      // Strongdrink
      generateProduct({ name: 'Beer Blond', category: 4, price: 3.00, stock: 15000, stockPerTime: 330, stockAlert: 5000, image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Beer Dark', category: 4, price: 3.00, stock: 13500, stockPerTime: 500, stockAlert: 5000, image: 'https://images.unsplash.com/photo-1581457954431-18ef26091378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80' }),
      generateProduct({ name: 'Wine', category: 4, price: 3.00, stock: 0, stockPerTime: 100, stockAlert: 2000, image: 'https://images.unsplash.com/photo-1561461056-77634126673a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      // Shots
      generateProduct({ name: 'Whiskey', category: 5, price: 5.00, stock: 1600, stockPerTime: 40, stockAlert: 400, image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Cognac', category: 5, price: 5.00, stock: 3200, stockPerTime: 40, stockAlert: 400, image: 'https://images.unsplash.com/photo-1548002697-53588109e668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Vodka', category: 5, price: 5.00, stock: 4000, stockPerTime: 40, stockAlert: 400, image: 'https://images.unsplash.com/photo-1539606494565-02e568638d91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80' }),
      // Food
      generateProduct({ name: 'Cake', category: 6, price: 7.00, stockAlert: 20, image: 'https://images.unsplash.com/photo-1552691562-ca24c2d53fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Toast', category: 6, price: 7.00, stockAlert: 20, image: 'https://images.unsplash.com/photo-1581771556488-da02d801966c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Focaccia', category: 6, price: 7.00, stockAlert: 20, image: 'https://images.unsplash.com/photo-1605466237823-49122fcaf198?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80' }),
      generateProduct({ name: 'Hot Dog', category: 6, price: 7.00, stockAlert: 20, image: 'https://images.unsplash.com/photo-1638368593249-7cadb261e8b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdCUyMGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60' }),
      generateProduct({ name: 'Hamburger', category: 6, price: 7.00, stockAlert: 20, image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }),
      generateProduct({ name: 'Fried Potatoes', category: 6, price: 5.00, stockAlert: 20, image: 'https://images.unsplash.com/photo-1623238912680-26fc5ffb57e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' }),
    ],
    productVariants: [
      // Caffee
      generateProductVariant({ name: 'Expresso', product: 1, price: 1.00, stockPerTime: 7 }),
      generateProductVariant({ name: 'Double', product: 1, price: 2.00, stockPerTime: 14 }),
      generateProductVariant({ name: 'American', product: 1, price: 2.50, stockPerTime: 7 }),
      // Hot chocolate
      generateProductVariant({ name: 'Chocolate', product: 3, price: 3.00 }),
      generateProductVariant({ name: 'With Cream', product: 3, price: 4.50 }),
      // Tea
      generateProductVariant({ name: 'Green', product: 5, price: 0, stock: Number(faker.random.numeric(2)) }),
      generateProductVariant({ name: 'Black', product: 5, price: 0, stock: Number(faker.random.numeric(2)) }),
      generateProductVariant({ name: 'Fruit', product: 5, price: 0, stock: Number(faker.random.numeric(2)) }),
      // Coca-Cola
      generateProductVariant({ name: 'Normal', sku: 'COLA_NORMAL', product: 6, price: 2.50, stock: Number(faker.random.numeric(2)) }),
      generateProductVariant({ name: 'Zero', sku: 'COLA_ZERO', product: 6, price: 2.50, stock: Number(faker.random.numeric(2)) }),
      // Water
      generateProductVariant({ name: 'Still', sku: 'WATER_STILL', product: 10, price: 0, stock: 14 }),
      generateProductVariant({ name: 'Gas', sku: 'WATER_GAS', product: 10, price: 0, stock: 32 }),
      // Beer Blond
      generateProductVariant({ name: 'Small', sku: 'BEER_BLOND_SMALL', product: 11, price: 3.50 }),
      generateProductVariant({ name: 'Medium', sku: 'BEER_BLOND_MEDIUM', product: 11, price: 5.00 }),
      // Beer Dark
      generateProductVariant({ name: 'Small', sku: 'BEER_DARK_SMALL', product: 12, price: 3.50 }),
      generateProductVariant({ name: 'Medium', sku: 'BEER_DARK_MEDIUM', product: 12, price: 5.00 }),
      // Wine
      generateProductVariant({ name: 'Red', sku: 'WINE_RED', product: 13, price: 0, stock: 2400 }),
      generateProductVariant({ name: 'White', sku: 'WINE_WHITE', product: 13, price: 0, stock: 5400 }),
      // Cake
      generateProductVariant({ name: 'Apple', sku: 'CAKE_APPLE', product: 17, price: 0, stock: Number(faker.random.numeric(2)) }),
      generateProductVariant({ name: 'Cheese', sku: 'CAKE_CHEESE', product: 17, price: 0, stock: Number(faker.random.numeric(2)) }),
    ],
    orders: [],
    orderLines: [],
  };

  const [ orderLines, orderLinesCountPerDay ] = generateOrderLines(
    config.products.filter(({ isAvailable, isArchived }) => isAvailable && !isArchived),
    config.productVariants,
  );

  config.orderLines = [ ...orderLines ];
  config.orders = generateOrders(orderLinesCountPerDay);

  return config;
}

function generateUser(
  gender: 'male' | 'female',
  { type = UserType.ADMIN, isArchived = false, image: photo = generateRandomAvatar() }: Partial<User>,
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

function generateCategory({ name = EMPTY_STRING, isAvailable = true }: Partial<Category>): Category {
  return {
    name,
    isAvailable,
  };
}

function generateProduct({
  name = faker.commerce.productName(),
  category = 1,
  image = EMPTY_STRING,
  isAvailable = true,
  isArchived = false,
  price = generatePrice(),
  stockPerTime = 1,
  stockAlert = 10,
  stock = Number(faker.random.numeric(2)),
}: Partial<Product>): Product {
  return {
    sku: getSku(name),
    price,
    stock,
    stockAlert,
    stockPerTime,
    image,
    name,
    category,
    isAvailable,
    isArchived,
  };
}

function generateProductVariant({
  name = faker.commerce.productName(),
  product = 1,
  stock = null,
  stockAlert = null,
  stockPerTime = null,
  price,
  sku,
}: Partial<ProductVariant>): ProductVariant {
  return {
    sku: sku || getSku(name),
    price: price !== undefined ? price : generatePrice(),
    stock,
    stockAlert,
    stockPerTime,
    name,
    product,
  };
}

function generateOrders(orderLinesCountPerDay: number[]): Order[] {
  const orders: Order[] = [];
  const today: Date = getWorkStartDate();
  const users: number[] = [ 6, 7, 10, 11, 13, 14 ];

  let idCounter: number = 0;
  let daysCounter: number = DAYS;

  for (const linesCountPerDay of orderLinesCountPerDay) {
    let orderDate: number = Number(new Date(Number(today) - DAY_MILLISECONDS * daysCounter));
    let usedLines: number = 0;

    let [ userOrdersCount, userId ] = getUserOrdersCountAndId(users, 0);

    while (usedLines !== linesCountPerDay) {
      let linesCount: number = getRandomNumber(1, 3);

      if (usedLines + linesCount > linesCountPerDay) {
        linesCount = linesCountPerDay - usedLines;
      }

      const lineIds: number[] = [];

      for (let i = 0; i < linesCount; i += 1) {
        idCounter += 1;
        lineIds.push(idCounter);
      }

      const nextOrderStartMilliseconds: number = getNextOrderMilliseconds();
      orderDate += nextOrderStartMilliseconds;

      const generatedOrder: Order = generateOrder(lineIds, new Date(orderDate), userId);
      orders.push(generatedOrder);

      usedLines += linesCount;

      userOrdersCount -= 1;

      if (userOrdersCount === 0) {
        const [ newUserOrdersCount, newUserId ] = getUserOrdersCountAndId(users, userId);
        userOrdersCount = newUserOrdersCount;
        userId = newUserId;
      }
    }

    daysCounter -= 1;
  }

  return orders;
}

function generateOrder(
  lineIds: number[],
  createdAt: Date,
  user: number,
): Order {
  return {
    createdAt,
    user,
    lines: [ ...lineIds ],
    taxes: 5,
    paymentMethod: getPaymentMethod(),
  };
}

function generateOrderLines(products: Product[], variants: ProductVariant[]): [ OrderLine[], number[] ] {
  const orderLines: OrderLine[] = [];
  const orderLinesCountPerDay: number[] = [];

  createArray(DAYS).forEach(() => {
    const linesCount: number = generateOrderLineCount();
    const lines = createArray(linesCount).map(() => generateOrderLine(products, variants));

    orderLinesCountPerDay.push(linesCount);
    orderLines.push(...lines);
  });

  return [ orderLines, orderLinesCountPerDay ];
}

function generateOrderLine(products: Product[], variants: ProductVariant[]): OrderLine {
  const count: number = Number(faker.random.numeric(1));
  const line: OrderLine = {
    count: count > 6 ? count - 5 : count,
    product: 0,
    variant: null,
  };

  const productId: number = getRandomNumber(1, products.length);
  line.product = productId;

  const productVariants: { variant: ProductVariant, index: number }[] = variants
    .map((variant, index) => ({ variant, index: index + 1 }))
    .filter(({ variant }) => variant.product === productId);

  if (productVariants.length) {
    const variantId: number = getRandomNumber(0, productVariants.length - 1);
    const { index } = productVariants[variantId];

    line.variant = index;
  }

  return line;
}
