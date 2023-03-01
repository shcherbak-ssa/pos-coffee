import type { AnyType, AnyValue } from 'shared/types';
import { ZERO } from 'shared/constants';
import { isNestedObject } from 'shared/utils/nested-object';
import { removeUntrackedFields } from 'shared/utils/untracked-fields';

const NO_UPDATE_KEYS_COUNT: number = 1;

export function getUpdates(originalObject: AnyType, objectWithUpdates: AnyType): Partial<AnyType> {
  const objectId: AnyValue = objectWithUpdates.id;
  objectWithUpdates = removeUntrackedFields(objectWithUpdates);

  const updates: Partial<AnyType> = { id: objectId || originalObject.id };

  for (const [ key, value ] of Object.entries(objectWithUpdates)) {
    if (isNestedObject(value)) {
      const nestedUpdates: Partial<AnyType> = getUpdates(originalObject[key] as AnyType, value as AnyType);

      if (!isEmptyObject(nestedUpdates)) {
        updates[key] = nestedUpdates;
      }

      continue;
    }

    if (originalObject[key] !== value) {
      updates[key] = value;
    }
  }

  if (Object.keys(updates).length === NO_UPDATE_KEYS_COUNT) {
    return {};
  }

  return updates;
}

function isEmptyObject<T extends object>(obj: T): boolean {
  return Object.keys(obj).length === ZERO;
}
