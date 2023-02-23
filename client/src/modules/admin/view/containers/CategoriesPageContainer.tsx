import { useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';

import type { CategorySchema, Entity } from 'shared/types';
import { EntityName } from 'shared/constants';
import { useController } from 'view/hooks/controller';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { CategoriesController, EntityViewComponentProps } from '@admin/shared/types';
import { Action, ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import {
  actionsMenuItemsProps as configActionsMenuItemsProps,
  headerMenuItems,
  pages,
} from '@admin/shared/configs/pages';
import { confirmDialogConfig } from '@admin/shared/configs/confirm-dialog';
import { usePageContainer } from '@admin/view/hooks/page-container';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { CategoriesListContainer } from '@admin/view/containers/CategoriesListContainer';
import { CategoriesSelectedContainer } from '@admin/view/containers/CategoriesSelectedContainer';
import { CategoriesArchiveMessage } from '@admin/view/components/CategoriesArchiveMessage';

export function CategoriesPageContainer() {

  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ isPopupVisible, setIsPopupVisible ] = useState<boolean>(false);
  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  const actionsMenuItemsProps: ActionsMenuItemsProps = {
    ...configActionsMenuItemsProps.categories,
    overrides: {
      [Action.VIEW]: () => ({ visible: false }),
      [Action.EDIT]: (item: MenuItem) => ({
        ...item,
        command: () => {
          setIsEditMode(true);
        },
      }),
      [Action.ARCHIVE]: (item: MenuItem, entity: Entity) => ({
        ...item,
        command: () => {
          confirmDialog({
            ...confirmDialogConfig.archive,
            message: <CategoriesArchiveMessage category={entity as CategorySchema} />,
            accept: () => {
              categoriesController.archive(entity.id);
            },
          });
        },
      }),
    },
  };

  const pageLayoutProps: PageLayoutProps | undefined = usePageContainer({
    page: {
      ...pages[PageTitle.CATEGORIES],
      headerMenuItem: headerMenuItems.categories,
    },
    entityName: EntityName.CATEGORY,
    showSubHeader: false,
    storeName: StoreName.CATEGORIES,
    controllerName: ControllerName.CATEGORIES,
    infoPagePath: PagePath.PRODUCTS_INFO,
    addButton: {
      label: 'Create new category',
      command: () => {
        categoriesController.select()
          .then(() => {
            setIsEditMode(true);
            setIsPopupVisible(true);
          });
      },
    },
    pageContent: ({ actionsMenuItemsProps: items, ...props }: EntityViewComponentProps<CategorySchema>) => (
      <CategoriesListContainer
        isEditMode={isEditMode}
        isLoading={isSaveProcessing}
        saveCategory={saveCategory}
        cancel={removeEditMode}
        actionsMenuItemsProps={actionsMenuItemsProps}
        {...props}
      />
    ),
  });

  function saveCategory(category: CategorySchema): void {
    setIsSaveProcessing(true);

    categoriesController.save(category)
      .then((savedCategoryId) => {
        if (savedCategoryId) {
          setIsEditMode(false);
          setIsPopupVisible(false);
        }

        setIsSaveProcessing(false);
      });
  }

  function removeEditMode(): void {
    setIsEditMode(false);
  }

  function hideCreatePopup(): void {
    setIsPopupVisible(false);
  }

  if (pageLayoutProps) {
    return (
      <>
        <PageLayout {...pageLayoutProps} />

        <Dialog
          className="popup"
          header="New category"
          visible={isPopupVisible}
          onHide={hideCreatePopup}
        >
          <CategoriesSelectedContainer
            mode="create"
            actionsMenuItemsProps={actionsMenuItemsProps}
            isEditMode={isEditMode}
            isLoading={isSaveProcessing}
            saveCategory={saveCategory}
            cancel={removeEditMode}
          />
        </Dialog>
      </>
    );
  }

  return <EmptyComponent />;

}
