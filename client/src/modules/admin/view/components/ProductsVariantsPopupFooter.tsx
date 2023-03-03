import type { MouseEvent } from 'react';
import { Button } from 'primereact/button';

import type { EmptyFunction } from 'shared/types';

export type Props = {
  isEditMode: boolean;
  isLoading: boolean;
  hide: EmptyFunction;
  save: EmptyFunction;
  edit: EmptyFunction;
}

export function ProductsVariantsPopupFooter({ isEditMode, isLoading, hide, save, edit }: Props) {

  function handleCancelButtonClick(e: MouseEvent): void {
    e.preventDefault();

    hide();
  }

  function handleSaveButtonClick(e: MouseEvent): void {
    e.preventDefault();

    save();
  }

  function handleEditButtonClick(e: MouseEvent): void {
    e.preventDefault();

    edit();
  }

  function renderPrimaryButton(): React.ReactNode {
    if (isEditMode) {
      return (
        <Button
          label="Save"
          loading={isLoading}
          onClick={handleSaveButtonClick}
        />
      );
    }

    return (
      <Button
        label="Edit"
        onClick={handleEditButtonClick}
      />
    );
  }

  return (
    <div className="flex justify-end gap-4 w-full">
      <Button
        className="p-button-text"
        label="Cancel"
        onClick={handleCancelButtonClick}
      />

      { renderPrimaryButton() }
    </div>
  );

}
