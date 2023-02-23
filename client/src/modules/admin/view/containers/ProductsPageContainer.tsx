import type { ColumnProps } from 'primereact/column';

import { EntityName } from 'shared/constants';
import { EmptyComponent } from 'view/components/EmptyComponent';

import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { actionsMenuItemsProps, headerMenuItems, pages } from '@admin/shared/configs/pages';
import { usePageContainer } from '@admin/view/hooks/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { ProductsImage } from '@admin/view/components/ProductsImage';
import { ProductsCard } from '@admin/view/components/ProductsCard';
import { AvailableLabel } from '@admin/view/components/AvailableLabel';
import { CategoryLabel } from '@admin/view/components/CategoryLabel';

export function ProductsPageContainer() {

  const productsTableColumns: ColumnProps[] = [
    {
      field: 'photo',
      header: 'Photo',
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

  const pageLayoutProps: PageLayoutProps | undefined = usePageContainer({
    page: {
      ...pages[PageTitle.PRODUCTS],
      headerMenuItem: headerMenuItems.products,
    },
    entityName: EntityName.PRODUCT,
    storeName: StoreName.PRODUCTS,
    controllerName: ControllerName.PRODUCTS,
    infoPagePath: PagePath.PRODUCTS_INFO,
    actionsMenuItemsProps: actionsMenuItemsProps.products,
    tableColumns: productsTableColumns,
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
