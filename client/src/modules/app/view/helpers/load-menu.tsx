import { useEffect, useState } from 'react';

import type { AnyType } from 'shared/types';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { CartController } from '@app/shared/types';
import { ControllerName } from '@app/shared/constants';

export function loadMenu(Container: React.ComponentType<AnyType>): () => JSX.Element {

  return function () {

    const [ isCategoriesLoaded, setIsCategoriesLoaded ] = useState<boolean>(false);
    const [ isProductsLoaded, setIsProductsLoaded ] = useState<boolean>(false);

    const cartController = useController(ControllerName.CART) as CartController;

    useEffect(() => {
      Promise
        .all([
          cartController.loadCategories(),
          cartController.loadProducts(),
        ])
        .then(() => {
          setIsCategoriesLoaded(true);
          setIsProductsLoaded(true);
        });
    }, []);

    if (isCategoriesLoaded && isProductsLoaded) {
      return <Container />;
    }

    return <AppLoader />;

  }

}
