import { useEffect, useState } from 'react';

import type { AnyType } from 'shared/types';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { AppController } from '@app/shared/types';
import { ControllerName } from '@app/shared/constants';

export function loadHomeData(Container: React.ComponentType<AnyType>): () => JSX.Element {

  return function () {

    const [ isDataLoaded, setIsDataLoaded ] = useState<boolean>(false);
    const appController = useController(ControllerName.APP) as AppController;

    useEffect(() => {
      appController.loadData()
        .then(() => {
          setIsDataLoaded(true);
        });
    }, []);

    if (isDataLoaded) {
      return <Container />;
    }

    return <AppLoader />;

  }

}
