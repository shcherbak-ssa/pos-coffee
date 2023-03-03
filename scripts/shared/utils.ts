import { faker } from '@faker-js/faker';

import { AVATART_GENERATOR_URL, PaymentMethod, paymentMethods } from './constants';

const alreadyGeneratedAvatarIds: number[] = [];

export function createArray(length: number): null[] {
  return new Array(length).fill(null);
}

export function generateRandomAvatar(): string {
  const avatarId: number = getRandomNumber(1, 70);

  if (alreadyGeneratedAvatarIds.includes(avatarId)) {
    return generateRandomAvatar();
  }

  alreadyGeneratedAvatarIds.push(avatarId);

  return AVATART_GENERATOR_URL + avatarId;
}

export function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getSku(name: string): string {
  return name
    .toUpperCase()
    .replace(/[\s|-]/g, '_')
    .replace(/[\(\)]/g, '')
    .replace(/\./, '');
}

export function generatePrice(): number {
  const { price } = faker.commerce;
  const whole: string = price(1, 50, 0);
  const decimal: string = price(1, 10, 0);

  return Number(`${whole}.${decimal}`);
}

export function generateOrderLineCount(): number {
  return 200 + Number(faker.random.numeric(2));
}

export function getPaymentMethod(): PaymentMethod {
  return paymentMethods[getRandomNumber(0, paymentMethods.length - 1)];
}

export function getWorkStartDate(): Date {
  const date: Date = new Date();
  date.setHours(8, 0);

  return date;
}

export function getNextOrderMilliseconds(): number {
  return (200 + Number(faker.random.numeric(2))) * 1000;
}

export function getUserOrdersCountAndId(users: number[], currentUserId: number): number[] {
  const userOrdersCount: number = getRandomNumber(1, 20);
  let userId: number = getUserId(users, currentUserId);

  return [ userOrdersCount, userId ];
}

export function getUserId(users: number[], currentUserId: number): number {
  const userId: number = users[getRandomNumber(0, users.length - 1)];

  return userId === currentUserId
    ? getUserId(users, currentUserId)
    : userId;
}
