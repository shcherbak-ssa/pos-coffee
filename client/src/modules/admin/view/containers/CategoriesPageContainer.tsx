import { useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';

import type { CategorySchema, Entity } from 'shared/types';
import { useController } from 'view/hooks/controller';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { CategoriesController, EntityViewComponentProps } from '@admin/shared/types';
import { Action, ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { actionsMenuItemsProps, headerMenuItems, pages } from '@admin/shared/configs/pages';
import { usePageContainer } from '@admin/view/hooks/page-container';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { CategoriesListContainer } from '@admin/view/containers/CategoriesListContainer';

export function CategoriesPageContainer() {

  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  const pageLayoutProps: PageLayoutProps | undefined = usePageContainer({
    page: {
      ...pages[PageTitle.CATEGORIES],
      headerMenuItem: headerMenuItems.categories,
    },
    showSubHeader: false,
    storeName: StoreName.CATEGORIES,
    controllerName: ControllerName.CATEGORIES,
    infoPagePath: PagePath.PRODUCTS_INFO,
    actionsMenuItemsProps: {
      ...actionsMenuItemsProps.categories,
      overrides: {
        [Action.VIEW]: () => {
          return { visible: false };
        },
        [Action.EDIT]: (item: MenuItem, entity: Entity) => {
          return {
            ...item,
            command: () => {
              setIsEditMode(true);
            },
          };
        },
      },
    },
    addButton: {
      label: 'Create new category',
      command: () => {
        categoriesController.select()
          .then(() => {
            setIsEditMode(true);
          });
      },
    },
    pageContent: (props: EntityViewComponentProps<CategorySchema>) => (
      <CategoriesListContainer
        isEditMode={isEditMode}
        isLoading={isSaveProcessing}
        saveCategory={saveCategory}
        removeEditMode={removeEditMode}
        {...props}
      />
    ),
  });

  function saveCategory(category: CategorySchema): void {
    setIsSaveProcessing(true);

    categoriesController.save(category)
      .then(() => {
        setIsSaveProcessing(false);
        setIsEditMode(false);
      });
  }

  function removeEditMode(): void {
    setIsEditMode(false);
  }

  if (pageLayoutProps) {
    return <PageLayout {...pageLayoutProps} />;
  }

  return <EmptyComponent />;

}
