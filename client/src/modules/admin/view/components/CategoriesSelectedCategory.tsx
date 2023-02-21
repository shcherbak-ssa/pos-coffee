import { type MouseEvent, useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { Message } from 'primereact/message';

import type { CategorySchema, EmptyFunction } from 'shared/types';
import { InputWrapper } from 'view/components/InputWrapper';

import type { CardWithInputsProps, CategoryDraft } from '@admin/shared/types';
import { DEFAULT_CATEGORY_NAME } from '@admin/shared/constants';
import { AvailableCheckbox } from '@admin/view/components/AvailableCheckbox';
import { CardHeading } from '@admin/view/components/CardHeading';
import { CardWrapper } from '@admin/view/components/CardWrapper';
import { SaveButton } from '@admin/view/components/SaveButton';
import { EntityName } from 'shared/constants';

export type Props = CardWithInputsProps<CategorySchema, CategoryDraft> & {
  isLoading: boolean;
  actionsMenuItems: MenuItem[];
  saveCategory: (category: CategorySchema) => void;
  removeEditMode: EmptyFunction;
};

export function CategoriesSelectedCategory({
  entity: category,
  entityDraft: draftCategory,
  validationError,
  isEditMode,
  isLoading,
  actionsMenuItems,
  saveCategory,
  removeEditMode,
}: Props) {

  const menu = useRef<Menu>(null);

  function toggleMenu(e: MouseEvent): void {
    e.preventDefault();

    if (menu.current) {
      menu.current.toggle(e);
    }
  }

  function isDefaultCategory(): boolean {
    return category.name === DEFAULT_CATEGORY_NAME;
  }

  function handleRemoveEditModeButtonClick(e: MouseEvent): void {
    e.preventDefault();

    removeEditMode();
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
          onClick={handleRemoveEditModeButtonClick}
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
          isLoading={isLoading}
          click={() => saveCategory(category)}
        />
      );
    }
  }

  return (
    <div className="full p-4">
      <CardWrapper className="full">
        <div className="flex flex-col justify-between full">
          <div>
            <div className="flex items-center justify-between mb-5">
              <CardHeading className="mb-0" heading="Category" />

              { drawHeaderButton() }
            </div>

            <div>
              <AvailableCheckbox
                className="mb-10"
                entityName={EntityName.CATEGORY}
                isEditMode={isEditMode}
                checked={category.isAvailable}
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
                  value={category.name}
                  onChange={(e) => draftCategory.name = e.target.value}
                />
              </InputWrapper>

              <InputWrapper
                label="Products"
                valueKey="productsCount"
                validationError={validationError}
              >
                <InputText
                  id="name"
                  type="text"
                  disabled={true}
                  value={category.productsCount.toString()}
                />
              </InputWrapper>
            </div>
          </div>

          { drawDefaultCategoryMessage() }
          { drawSaveButton() }
        </div>
      </CardWrapper>
    </div>
  );

}
