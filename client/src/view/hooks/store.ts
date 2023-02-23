import { useSnapshot } from 'valtio';

import type { StoreState } from 'shared/types';
import { Context } from 'shared/context';

export function useStore(name: string): StoreState {
  const { state, ...rest } = Context.getStore(name) as StoreState;

  return { state: useSnapshot(state, { sync: true }), ...rest } as StoreState;
}
