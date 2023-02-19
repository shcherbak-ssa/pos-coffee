import type { ProductSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { ProductsStore } from '@admin/shared/types';
import { PagePath, PageTitle, StoreName, ControllerName } from '@admin/shared/constants';
import { actionsMenuItemsProps } from '@admin/shared/configs/pages';
import { type Return, useInfoPageContainer } from '@admin/view/hooks/info-page-container';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export type Props = {
  isEditMode: boolean;
}

export function ProductsInfoPageContainer({ isEditMode }: Props) {

  const { state: { selected } } = useStore(StoreName.PRODUCTS) as ProductsStore;

  const [ pageLayoutProps, validationError ]: Return<ProductSchema> = useInfoPageContainer({
    page: {
      to: PagePath.PRODUCTS,
      child: { title: selected.name },
    },
    pageTitle: PageTitle.PRODUCTS,
    storeName: StoreName.PRODUCTS,
    controllerName: ControllerName.PRODUCTS,
    infoPagePath: PagePath.PRODUCTS_INFO,
    actionsMenuItemsProps: actionsMenuItemsProps.products,
    errorMessage: 'Product not found',
    isEditMode,
  });

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <div></div>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
