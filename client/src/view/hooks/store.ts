import { useState } from 'react';

import type { StoreName } from 'shared/constants';
import { Context } from 'shared/context';

export function useStore<T, R extends keyof T = keyof T>(name: StoreName, key: R): T[R] {
  const store = Context.getStore(name) as T;
  const [ state, setState ] = useState<T[R]>(store[key]);

  // @ts-ignore
  return new Proxy<T[R]>(state, {
    set(target, p, newValue) {
      target[p as keyof T[R]] = newValue;
      store[key] = target;

      setState(store[key]);

      return true;
    },
  }) as T[R];

}
