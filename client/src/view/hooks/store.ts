import { useSnapshot } from 'valtio';

import type { Store } from 'shared/types';
import { Context } from 'shared/context';

export function useStore<T extends object>(name: string): Store<T> {
  const { state, ...rest } = Context.getStore(name) as Store<T>;

  return { state: useSnapshot(state, { sync: true }), ...rest } as Store<T>;
}
