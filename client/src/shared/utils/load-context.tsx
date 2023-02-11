import { useEffect, useState } from 'react';

import type { ControllerName, StoreName } from 'shared/constants';
import { Context } from 'shared/context';

import { AppLoader } from 'components/AppLoader';

export type Props = {
  stores?: StoreName[];
  controllers?: ControllerName[];
}

export function loadContext<T>(Container: React.ComponentType<T>, { stores = [], controllers = [] }: Props) {

  return function (props: typeof Container.propTypes) {

    const [ isStoresLoaded, setIsStoresLoaded ] = useState<boolean>(false);
    const [ isControllersLoaded, setIsControllersLoaded ] = useState<boolean>(false);

    useEffect(() => {
      Promise.all(stores.map(Context.loadStore))
        .then(() => {
          setIsStoresLoaded(true);
        });

      Promise.all(controllers.map(Context.loadController))
        .then(() => {
          setIsControllersLoaded(true);
        });
    }, []);


    if (isStoresLoaded && isControllersLoaded) {
      // @ts-ignore
      return <Container {...props} />;
    }

    return <AppLoader />;

  }

}
