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
    username: string;
    password: string;
    type: UserType;
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
      phone: '+375 33 308 10 37',
      username: '',
      password: 'qwerty1234',
      type: UserType.ADMIN,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('+### ## ### ## ##'),
      username: '',
      password: faker.internet.password(10),
      type: UserType.ADMIN,
    },
  ]
};

fs.writeFileSync(SERVER_CONFIG_FILENAME, JSON.stringify(fileContent, null, 2));

console.log('Generated!\n');
