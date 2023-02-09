import { useEffect, useState } from 'react';

import type { Controller, LoaderService as BaseLoaderService } from 'shared/types';
import type { ControllerName } from 'shared/constants';
import { LoaderService } from 'services/loader';

export function useController<T extends Controller>(name: ControllerName): T | undefined {
  const [ controller, setController ] = useState<Controller>();

  useEffect(() => {
    const loader: BaseLoaderService = LoaderService.create();

    loader.loadController(name)
      .then((loadedController) => {
        setController(loadedController);
      });
  }, []);

  return controller as T;
}
