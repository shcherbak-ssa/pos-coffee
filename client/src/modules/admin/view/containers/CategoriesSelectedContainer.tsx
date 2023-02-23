import { type MouseEvent, useEffect, useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';

import type { CategorySchema, EmptyFunction } from 'shared/types';
import { EntityName, ErrorType, ZERO } from 'shared/constants';
import { useError } from 'view/hooks/error';
import { useStore } from 'view/hooks/store';
import { InputWrapper } from 'view/components/InputWrapper';

import type { CategoriesStore } from '@admin/shared/types';
import { DEFAULT_CATEGORY_NAME, StoreName } from '@admin/shared/constants';
import { type Props as ActionsMenuItemsProps, useActionsMenuItems } from '@admin/view/hooks/actions-menu-items';
import { SaveButton } from '@admin/view/components/SaveButton';
import { AvailableCheckbox } from '@admin/view/components/AvailableCheckbox';
import { CardHeading } from '@admin/view/components/CardHeading';
import { CategoriesSelectedWrapper } from '@admin/view/components/CategoriesSelectedWrapper';

export type Props = {
  mode: 'edit' | 'create';
  actionsMenuItemsProps: ActionsMenuItemsProps,
  isEditMode: boolean;
  isLoading: boolean;
  saveCategory: (category: CategorySchema) => void;
  cancel: EmptyFunction;
}

export function CategoriesSelectedContainer({
  mode,
  actionsMenuItemsProps,
  isEditMode,
  isLoading,
  saveCategory,
  cancel
}: Props) {

  const { state: { selected: selectedCategory }, draft: draftCategory }
    = useStore(StoreName.CATEGORIES) as CategoriesStore;

  const [ validationError, cleanValidationError ] = useError<CategorySchema>(ErrorType.VALIDATION);

  const actionsMenuItems: MenuItem[] = useActionsMenuItems({
    ...actionsMenuItemsProps,
    isEntityPage: false,
    entity: selectedCategory,
  });

  useEffect(() => {
    return () => cleanValidationError();
  }, []);

  useEffect(() => {
    cleanValidationError();
  }, []);

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

    cancel();
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
          isLoading={isLoading}
          click={() => saveCategory(selectedCategory)}
        />
      );
    }
  }

  return (
    <CategoriesSelectedWrapper isCreateMode={isCreateMode()}>
      <div className="full">
        { drawHeader() }

        <div>
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

        { isCreateMode() ? <div></div> : <div className='mb-10' /> }

        { drawDefaultCategoryMessage() }

        { drawSaveButton() }
      </div>
    </CategoriesSelectedWrapper>
  );

}
