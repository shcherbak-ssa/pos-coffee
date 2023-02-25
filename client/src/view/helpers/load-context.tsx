import { useEffect, useState } from 'react';

import type { AnyType } from 'shared/types';
import { Context } from 'shared/context';
import { AppLoader } from 'view/components/AppLoader';

export type Props = {
  stores?: string[];
  controllers?: string[];
}

export function loadContext(
  Container: React.ComponentType<AnyType>,
  { stores = [], controllers = [] }: Props
): (props: AnyType) => JSX.Element {

  return function (props: AnyType) {

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
      return <Container {...props} />;
    }

    return <AppLoader />;

  }

}
