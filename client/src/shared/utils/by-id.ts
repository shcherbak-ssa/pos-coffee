import type { Entity } from 'shared/types';

export function filterById<T extends Entity>(items: T[], itemId: number): T[] {
  return items.filter(({ id }) => id !== itemId);
}

export function findById<T extends Entity>(items: T[], itemId: number): T | undefined {
  return items.find(({ id }) => id === itemId);
}

export function replaceById<T extends Entity>(items: T[], item: T): T[] {
  return items.map((listItem) => listItem.id === item.id ? item : listItem);
}
