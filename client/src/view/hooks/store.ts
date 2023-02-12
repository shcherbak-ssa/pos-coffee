import { useSnapshot } from 'valtio';

import type { Store } from 'shared/types';
import type { StoreName } from 'shared/constants';
import { Context } from 'shared/context';

export function useStore<T extends object>(name: StoreName): Store<T> {
  const { state, ...rest } = Context.getStore(name) as Store<T>;

  return { state: useSnapshot(state), ...rest } as Store<T>;
}
