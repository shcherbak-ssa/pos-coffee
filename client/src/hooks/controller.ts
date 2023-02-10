import { useEffect, useState } from 'react';

import type { Controller } from 'shared/types';
import type { ControllerName } from 'shared/constants';
import { Context } from 'shared/context';

export function useController<T extends Controller>(name: ControllerName): T | undefined {
  const [ controller, setController ] = useState<Controller>();

  useEffect(() => {
    Context.getLoader().loadController(name)
      .then((loadedController) => {
        setController(loadedController);
      });
  }, []);

  return controller as T;
}
