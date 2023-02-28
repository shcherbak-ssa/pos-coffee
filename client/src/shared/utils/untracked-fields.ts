import type { AnyType } from 'shared/types';
import { isNestedObject } from 'shared/utils/nested-object';

export function removeUntrackedFields(object: AnyType): AnyType {
  const { createdAt, updatedAt, archivedAt, isArchived, ...updates } = object;
  const updatedObject: AnyType = {};

  for (const [ key, value ] of Object.entries(updates)) {
    updatedObject[key] = isNestedObject(value)
      ? removeUntrackedFields(value as AnyType)
      : value;
  }

  return updatedObject;
}
