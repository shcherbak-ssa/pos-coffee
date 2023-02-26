import { CartCategoriesContainer } from '@app/view/containers/CartCategoriesContainer';
import { CartProductsContainer } from '@app/view/containers/CartProductsContainer';
import { CartOrderContainer } from '@app/view/containers/CartOrderContainer';
import { CardWrapper } from '@app/view/components/CardWrapper';

export function CartPageContainer() {

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
