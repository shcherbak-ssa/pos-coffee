import type { ColumnProps } from 'primereact/column';

import type { ProductSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { BasePrice } from 'view/components/BasePrice';

import type { AppStore } from '@admin/shared/types';
import { PagePath, StoreName } from '@admin/shared/constants';
import { actionsMenuItemsProps } from '@admin/shared/configs/pages';
import { PageDefaultContentContainer } from '@admin/view/containers/PageDefaultContentContainer';
import { ProductsImage } from 'view/components/ProductsImage';
import { ProductsCard } from '@admin/view/components/ProductsCard';
import { AvailableLabel } from '@admin/view/components/AvailableLabel';
import { CategoryLabel } from '@admin/view/components/CategoryLabel';
import { ProductsStockLabel } from '@admin/view/components/ProductsStockLabel';

export function ProductsPageContainer() {

  const { state: { settings } } = useStore(StoreName.APP) as AppStore;

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
      body: ({ price }: ProductSchema) => (
        <BasePrice price={price} currency={settings.currency} />
      ),
    },
    {
      field: 'stock',
      header: 'Stock',
      body: ({ stock, stockAlert }: ProductSchema) => (
        <ProductsStockLabel stock={stock} stockAlert={stockAlert} />
      ),
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
