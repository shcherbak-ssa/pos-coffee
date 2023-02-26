import type { ColumnProps } from 'primereact/column';

import { PagePath, StoreName } from '@admin/shared/constants';
import { actionsMenuItemsProps } from '@admin/shared/configs/pages';
import { ProductsImage } from 'view/components/ProductsImage';
import { ProductsCard } from '@admin/view/components/ProductsCard';
import { AvailableLabel } from '@admin/view/components/AvailableLabel';
import { CategoryLabel } from '@admin/view/components/CategoryLabel';
import { PageDefaultContentContainer } from '@admin/view/containers/PageDefaultContentContainer';

export function ProductsPageContainer() {

  const productsTableColumns: ColumnProps[] = [
    {
      field: 'image',
      header: 'Image',
      body: ProductsImage,
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'sku',
      header: 'Sku',
    },
    {
      field: 'price',
      header: 'Price',
    },
    {
      field: 'category',
      header: 'Category',
      body: CategoryLabel,
    },
    {
      field: 'isAvailable',
      header: 'Available',
      body: AvailableLabel,
    },
  ];

  return (
    <PageDefaultContentContainer
      storeName={StoreName.PRODUCTS}
      infoPagePath={PagePath.PRODUCTS_INFO}
      tableColumns={productsTableColumns}
      actionsMenuItemsProps={actionsMenuItemsProps.products}
      EntityComponent={ProductsCard}
    />
  );

}
