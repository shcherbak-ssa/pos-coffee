import { faker } from '@faker-js/faker';

import { AVATART_GENERATOR_URL } from './constants';

const alreadyGeneratedAvatarIds: number[] = [];

export function generateRundomAvatar(): string {
  const avatarId: number = getRandomNumber(1, 70);

  if (alreadyGeneratedAvatarIds.includes(avatarId)) {
    return generateRundomAvatar();
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
