import { loadContext } from 'shared/helpers/load-context';

import { StoreName, ControllerName } from '@admin/shared/constants';
import { ProductsInfoPageContainer } from '@admin/view/containers/ProductsInfoPageContainer';

export type Props = {
  isEditMode?: boolean;
}

const ProductsInfoPage = loadContext(Page, {
  stores: [ StoreName.PRODUCTS ],
  controllers: [ ControllerName.PRODUCTS ],
});

export default ProductsInfoPage;

function Page({ isEditMode = false }: Props) {

  return <ProductsInfoPageContainer isEditMode={isEditMode} />;

}
