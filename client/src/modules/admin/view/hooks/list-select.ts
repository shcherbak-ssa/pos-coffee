import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import type { ViewState } from '@admin/shared/types';
import { ListAction } from '@admin/shared/constants';

export type Props = {
  view: ViewState;
}

export type HoolReturn<T> = [boolean, T[], (t: T[]) => void];

export function useListSelect<T>({ view }: Props): HoolReturn<T> {
  const [ isSelectEnable, setIsSelectEnable ] = useState<boolean>(false);
  const [ selectedUsers, setSelectedUsers ] = useState<T[]>([]);

  useEffect(() => {
    const selectEnable: boolean = view.listAction.includes(ListAction.SELECT);

    setIsSelectEnable(selectEnable);

    if (!selectEnable) {
      setSelectedUsers([]);
    }

  }, [view.listAction]);

  return [ isSelectEnable, selectedUsers, setSelectedUsers ];
}
