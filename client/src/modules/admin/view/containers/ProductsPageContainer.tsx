import type { ColumnProps } from 'primereact/column';

import { EmptyComponent } from 'view/components/EmptyComponent';

import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { actionsMenuItemsProps } from '@admin/shared/configs/pages';
import { usePageContainer } from '@admin/view/hooks/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { ProductsPhoto } from '@admin/view/components/ProductsPhoto';
import { ProductsCard } from '@admin/view/components/ProductsCard';

export function ProductsPageContainer() {

  const productsTableColumns: ColumnProps[] = [
    {
      field: 'photo',
      header: 'Photo',
      body: ProductsPhoto,
    },
    {
      field: 'sku',
      header: 'Sku',
    },
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'price',
      header: 'Price',
    },
  ];

  const pageLayoutProps: PageLayoutProps | undefined = usePageContainer({
    pageTitle: PageTitle.PRODUCTS,
    storeName: StoreName.PRODUCTS,
    controllerName: ControllerName.PRODUCTS,
    infoPagePath: PagePath.PRODUCTS_INFO,
    actionsMenuItemsProps: actionsMenuItemsProps.products,
    tableColums: productsTableColumns,
    EntityComponent: ProductsCard,
    addButton: {
      label: 'Create new product',
      to: PagePath.PRODUCTS_CREATE,
    },
  });

  if (pageLayoutProps) {
    return <PageLayout {...pageLayoutProps} />;
  }

  return <EmptyComponent />;

}
