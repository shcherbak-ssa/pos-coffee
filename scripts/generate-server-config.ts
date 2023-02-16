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
    photo: string;
    isDeleted: boolean;
  }[];
}

const AVATART_GENERATOR_URL: string = 'https://i.pravatar.cc/300?img=';
const SERVER_CONFIG_FILENAME: string
  = path.resolve(__dirname, '..', 'server', 'src', 'main', 'resources', 'poscoffee', 'poscoffee.config.json');

const alreadyGeneratedAvatarIds: number[] = [];

const fileContent: Config = {
  users: [
    {
      name: 'Stanislav',
      surname: 'Shcherbakov',
      email: 'shcherbak.ssa@gmail.com',
      phone: '375333081037',
      password: 'qwerty1234',
      type: UserType.ADMIN,
      photo: generateRundomAvatar(),
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.ADMIN,
      photo: generateRundomAvatar(),
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.MANAGER,
      photo: generateRundomAvatar(),
      isDeleted: false,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.MANAGER,
      photo: '',
      isDeleted: false,
    },

    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      photo: '',
      isDeleted: false,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      photo: generateRundomAvatar(),
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      photo: generateRundomAvatar(),
      isDeleted: false,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      photo: '',
      isDeleted: false,
    },
    {
      name: faker.name.firstName('female'),
      surname: faker.name.lastName('female'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.MANAGER,
      photo: generateRundomAvatar(),
      isDeleted: true,
    },
    {
      name: faker.name.firstName('male'),
      surname: faker.name.lastName('male'),
      email: faker.internet.email(),
      phone: faker.phone.number('############'),
      password: faker.internet.password(10),
      type: UserType.WAITER,
      photo: generateRundomAvatar(),
      isDeleted: true,
    },
  ]
};

function generateRundomAvatar(): string {
  const avatarId: number = getRandomNumber(1, 70);

  if (alreadyGeneratedAvatarIds.includes(avatarId)) {
    return generateRundomAvatar();
  }

  alreadyGeneratedAvatarIds.push(avatarId);

  return AVATART_GENERATOR_URL + avatarId;
}

function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

fs.writeFileSync(SERVER_CONFIG_FILENAME, JSON.stringify(fileContent, null, 2));

console.log('Generated!\n');
