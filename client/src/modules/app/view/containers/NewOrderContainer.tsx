import { NewOrderCategoriesContainer } from '@app/view/containers/NewOrderCategoriesContainer';
import { NewOrderProductsContainer } from '@app/view/containers/NewOrderProductsContainer';
import { NewOrderLinesContainer } from '@app/view/containers/NewOrderLinesContainer';

export function NewOrderContainer() {

  return (
    <div className="flex gap-6 full">
      <div className="w-full">
        <NewOrderCategoriesContainer />
        <NewOrderProductsContainer />
      </div>

      <div className="sticky top-0 shrink-0 w-80">
        <NewOrderLinesContainer />
      </div>
    </div>
  );

}
