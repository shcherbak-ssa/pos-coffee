import type { AnyType } from 'shared/types';

export function getUpdates(originalObject: AnyType, objectWithUpdates: AnyType): Partial<AnyType> {
  objectWithUpdates = removeUntrackedFields(objectWithUpdates);

  const updates: Partial<AnyType> = { id: originalObject.id };

  for (const [ key, value ] of Object.entries(objectWithUpdates)) {
    if (isNestedObject(value)) {
      updates[key] = getUpdates(originalObject[key] as AnyType, value as AnyType);
      continue;
    }

    if (originalObject[key] !== value) {
      updates[key] = value;
    }
  }

  return updates;
}

function removeUntrackedFields(obj: AnyType): AnyType {
  const { id, createdAt, updatedAt, deletedAt, ...updatedObject } = obj;

  return updatedObject;
}

function isNestedObject<T>(value: T): boolean {
  return typeof value === 'object' && value !== null && !(value instanceof Date);
}
