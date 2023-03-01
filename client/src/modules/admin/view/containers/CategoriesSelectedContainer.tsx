import { type MouseEvent, useRef, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';

import type { CategorySchema, Entity } from 'shared/types';
import { EntityName, ErrorType } from 'shared/constants';
import { useError } from 'view/hooks/error';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { InputWrapper } from 'view/components/InputWrapper';
import { CardHeading } from 'view/components/CardHeading';

import type { AppController, AppStore, CategoriesController, CategoriesStore } from '@admin/shared/types';
import { Action, ControllerName, DEFAULT_CATEGORY_NAME, StoreName } from '@admin/shared/constants';
import { confirmDialogConfig } from '@admin/shared/configs/confirm-dialog';
import { useActionsMenuItems } from '@admin/view/hooks/actions-menu-items';
import { SaveButton } from '@admin/view/components/SaveButton';
import { AvailableCheckbox } from '@admin/view/components/AvailableCheckbox';
import { CategoriesSelectedWrapper } from '@admin/view/components/CategoriesSelectedWrapper';
import { actionsMenuItemsProps } from '@admin/shared/configs/pages';
import { CategoriesDeleteMessage } from '@admin/view/components/CategoriesDeleteMessage';

export type Props = {
  mode: 'edit' | 'create';
}

export function CategoriesSelectedContainer({ mode }: Props) {

  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const { state: { isEditMode } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const { state: { selected: selectedCategory }, draft: draftCategory }
    = useStore(StoreName.CATEGORIES) as CategoriesStore;
  const categoriesController = useController(ControllerName.CATEGORIES) as CategoriesController;

  const [ validationError ] = useError<CategorySchema>(ErrorType.VALIDATION);

  const actionsMenuItems: MenuItem[] = useActionsMenuItems({
    ...actionsMenuItemsProps.categories,
    isEntityPage: false,
    entity: selectedCategory,
    overrides: {
      [Action.VIEW]: () => ({ visible: false }),
      [Action.ARCHIVE]: () => ({ visible: false }),
      [Action.RESTORE]: () => ({ visible: false }),
      [Action.DELETE]: (item: MenuItem, entity: Entity) => ({
        ...item,
        visible: true,
        command: () => {
          confirmDialog({
            ...confirmDialogConfig.delete,
            message: <CategoriesDeleteMessage category={entity as CategorySchema} />,
            accept: () => {
              categoriesController.delete(entity.id)
                .then((success) => {
                  if (success) {
                    categoriesController.select();
                  }
                });
            },
          });
        },
      }),
    },
  });

  const menu = useRef<Menu>(null);

  function isCreateMode(): boolean {
    return mode === 'create';
  }

  function toggleMenu(e: MouseEvent): void {
    e.preventDefault();

    if (menu.current) {
      menu.current.toggle(e);
    }
  }

  function isDefaultCategory(): boolean {
    return selectedCategory.name === DEFAULT_CATEGORY_NAME;
  }

  function handleCancel(e: MouseEvent): void {
    e.preventDefault();

    appController.setIsEditMode(false);
  }

  function saveCategory(): void {
    setIsSaveProcessing(true);

    categoriesController.save()
      .then((savedCategoryId) => {
        if (savedCategoryId) {
          appController.setIsEditMode(false);
          categoriesController.setIsPopupOpen(false);
        }

        setIsSaveProcessing(false);
      });
  }

  function drawHeader(): React.ReactNode {
    if (isCreateMode()) {
      return;
    }

    return (
      <div className="flex items-center justify-between mb-5">
        <CardHeading className="mb-0" heading="Category" />

        { drawHeaderButton() }
      </div>
    );
  }

  function drawHeaderButton(): React.ReactNode {
    if (isDefaultCategory()) {
      return;
    }

    if (isEditMode) {
      return (
        <Button
          className="p-button-sm p-button-rounded"
          icon={PrimeIcons.TIMES}
          onClick={handleCancel}
        />
      );
    }

    return (
      <>
        <Button
          className="p-button-sm p-button-rounded"
          icon={PrimeIcons.BARS}
          onClick={toggleMenu}
        />

        <Menu
          model={actionsMenuItems}
          ref={menu}
          popup
        />
      </>
    );
  }

  function drawProductsInput(): React.ReactNode {
    if (!isEditMode) {
      return (
        <InputWrapper
          label="Products"
          valueKey="productsCount"
          validationError={validationError}
        >
          <InputText
            id="name"
            type="text"
            disabled={true}
            value={selectedCategory.productsCount.toString()}
          />
        </InputWrapper>
      );
    }
  }

  function drawDefaultCategoryMessage(): React.ReactNode {
    if (isDefaultCategory()) {
      return (
        <Message
          className="mt-10"
          severity="warn"
          text="The default category cannot be modified"
        />
      );
    }
  }

  function drawSaveButton(): React.ReactNode {
    if (isEditMode) {
      return (
        <SaveButton
          className="w-full"
          isLoading={isSaveProcessing}
          click={() => saveCategory()}
        />
      );
    }
  }

  return (
    <CategoriesSelectedWrapper isCreateMode={isCreateMode()}>
      <div className="full">
        { drawHeader() }

        <div className="py-2">
          <AvailableCheckbox
            className="mb-10"
            entityName={EntityName.CATEGORY}
            isEditMode={isEditMode}
            checked={selectedCategory.isAvailable}
            change={(isAvailable: boolean) => draftCategory.isAvailable = isAvailable}
          />

          <InputWrapper
            className="mb-10"
            label="Name"
            valueKey="name"
            validationError={validationError}
          >
            <InputText
              id="name"
              type="text"
              disabled={!isEditMode}
              value={selectedCategory.name}
              onChange={(e) => draftCategory.name = e.target.value}
            />
          </InputWrapper>

          { drawProductsInput() }
        </div>

        { drawDefaultCategoryMessage() }

        { drawSaveButton() }
      </div>
    </CategoriesSelectedWrapper>
  );

}
