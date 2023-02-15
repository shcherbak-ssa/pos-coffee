import path from 'path';
import fs from 'fs';
import { faker } from '@faker-js/faker';

enum UserType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
}

type Config = {
  users: {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    type: UserType;
    isDeleted: boolean;
  }[];
}

const SERVER_CONFIG_FILENAME: string
  = path.resolve(__dirname, '..', 'server', 'src', 'main', 'resources', 'poscoffee', 'poscoffee.config.json');

const fileContent: Config = {
  users: [
    {
      name: 'Stanislav',
      surname: 'Shcherbakov',
      email: 'shcherbak.ssa@gmail.com',
      phone: '375333081037',
      password: 'qwerty1234',
      type: UserType.ADMIN,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.ADMIN,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.MANAGER,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.MANAGER,
      isDeleted: false,
    },

    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.MANAGER,
      isDeleted: true,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      isDeleted: true,
    },
  ]
};

fs.writeFileSync(SERVER_CONFIG_FILENAME, JSON.stringify(fileContent, null, 2));

console.log('Generated!\n');
