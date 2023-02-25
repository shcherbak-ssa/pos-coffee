import { useEffect, useState } from 'react';

import type { AnyType } from 'shared/types';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { MenuController } from '@app/shared/types';
import { ControllerName } from '@app/shared/constants';

export function loadMenu(Container: React.ComponentType<AnyType>): () => JSX.Element {

  return function () {

    const [ isCategoriesLoaded, setIsCategoriesLoaded ] = useState<boolean>(false);
    const [ isProductsLoaded, setIsProductsLoaded ] = useState<boolean>(false);

    const menuController = useController(ControllerName.MENU) as MenuController;

    useEffect(() => {
      menuController.loadCategories()
        .then(() => {
          setIsCategoriesLoaded(true);
        });

      menuController.loadProducts()
        .then(() => {
          setIsProductsLoaded(true);
        });
    }, []);

    if (isCategoriesLoaded && isProductsLoaded) {
      return <Container />;
    }

    return <AppLoader />;

  }

}
