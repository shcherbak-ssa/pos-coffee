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
