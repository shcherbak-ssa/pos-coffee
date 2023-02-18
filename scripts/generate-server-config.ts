import fs from 'fs';
import { faker } from '@faker-js/faker';

import type { Address, Config, User } from './shared/types';
import { AVATART_GENERATOR_URL, SERVER_CONFIG_FILENAME, UserType } from './shared/constants';

const alreadyGeneratedAvatarIds: number[] = [];

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

fs.writeFileSync(
  SERVER_CONFIG_FILENAME,
  JSON.stringify(generateConfig(), null, 2)
);

console.log('Generated!\n');

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
