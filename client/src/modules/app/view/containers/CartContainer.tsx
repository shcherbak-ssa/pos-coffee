import { ScrollPanel } from 'primereact/scrollpanel';

import { CartCategoriesContainer } from '@app/view/containers/CartCategoriesContainer';
import { CartProductsContainer } from '@app/view/containers/CartProductsContainer';
import { CartLinesContainer } from '@app/view/containers/CartLinesContainer';

export function CartContainer() {

  return (
    <div className="flex gap-4 pr-4 pb-4 full">
      <div className="full">
        <CartCategoriesContainer />

        <ScrollPanel style={{ width: 'calc(100% + 18px)', height: 'calc(100% - 38px)' }}>
          <div className="">
            <CartProductsContainer />
          </div>
        </ScrollPanel>
      </div>

      <div className="shrink-0 w-80 h-full">
        <CartLinesContainer />
      </div>
    </div>
  );

}
