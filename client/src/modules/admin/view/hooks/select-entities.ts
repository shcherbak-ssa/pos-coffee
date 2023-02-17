import { useEffect, useState } from 'react';

import type { AppViewState } from '@admin/shared/types';
import { ListAction } from '@admin/shared/constants';

export type Props = {
  view: AppViewState;
}

export type HookReturn<T> = [boolean, T[], (entities: T[]) => void];

export function useSelectedEntities<T>({ view }: Props): HookReturn<T> {
  const [ isSelectEnable, setIsSelectEnable ] = useState<boolean>(false);
  const [ selectedEntities, setSelectedEntities ] = useState<T[]>([]);

  useEffect(() => {
    const selectEnable: boolean = view.listAction.includes(ListAction.SELECT);

    setIsSelectEnable(selectEnable);

    if (!selectEnable) {
      setSelectedEntities([]);
    }
  }, [view.listAction]);

  useEffect(
    () => setSelectedEntities([]),
    [view.listTab],
  );

  return [ isSelectEnable, selectedEntities, setSelectedEntities ];
}
