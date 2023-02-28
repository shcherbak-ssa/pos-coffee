import { useState } from 'react';
import { BlockUI } from 'primereact/blockui';

import { useStore } from 'view/hooks/store';

import type { AppStore } from '@app/shared/types';
import { StoreName } from '@app/shared/constants';
import { AppCashierContainer } from '@app/view/containers/AppCashierContainer';
import { CartCategoriesContainer } from '@app/view/containers/CartCategoriesContainer';
import { CartProductsContainer } from '@app/view/containers/CartProductsContainer';
import { CartOrderContainer } from '@app/view/containers/CartOrderContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';

export function CartPageContainer() {

  const { state: { users } } = useStore(StoreName.APP) as AppStore;

  const [ isUIBlocked, setIsUIBlocked ] = useState<boolean>(false);

  if (users.cashier) {
    return (
      <div className="flex gap-4 pr-4 pb-4 full">
        <div className="h-full">
          <CartCategoriesContainer />
          <CartProductsContainer />
        </div>

        <div className="cart-lines shrink-0 h-full">
          <CardWrapper className="full p-4">
            <CartOrderContainer />
          </CardWrapper>
        </div>
      </div>
    );
  }

  return (
    <div className="full flex-center">
      <CardWrapper>
        <div className="p-4 text-center">
          <h3 className="text-lg mb-6">Please, select the cashier to continue</h3>

          <div className="px-12">
            <AppCashierContainer />
          </div>
        </div>
      </CardWrapper>
    </div>
  );

}
