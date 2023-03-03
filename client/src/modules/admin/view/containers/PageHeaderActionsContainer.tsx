import { MouseEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { CrudController, Entity, StoreEntityState } from 'shared/types';
import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppStore, AppController } from '@admin/shared/types';
import { ControllerName, NAVIGATE_BACK, StoreName } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';
import { SaveButton } from '@admin/view/components/SaveButton';

export type Props = {
  storeName: StoreName;
  controllerName: string;
  actionsMenuItemsProps?: ActionsMenuItemsProps;
}

export function PageHeaderActionsContainer({
  storeName,
  controllerName,
  actionsMenuItemsProps,
}: Props) {

  const navigate: NavigateFunction = useNavigate();
  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const store = useStore(storeName) as StoreEntityState<{}, Entity>;
  const controller = useController(controllerName) as CrudController;

  const { state: { isEditMode } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function save(): void {
    if (isSaveProcessing || !isEditMode || !controller) {
      return;
    }

    setIsSaveProcessing(true);

    controller.save()
      .then((success) => {
        if (success) {
          appController.setIsEditMode(false);
        }

        setIsSaveProcessing(false);
      });
  }

  function removeEditMode(e: MouseEvent): void {
    e.preventDefault();

    appController.setIsEditMode(false);
    controller.select(store.state.selected.id);

    if (store.state.selected.id === ZERO) {
      navigate(NAVIGATE_BACK);
    }
  }

  function renderSaveButton(): React.ReactNode {
    if (isEditMode) {
      return (
        <SaveButton
          isLoading={isSaveProcessing}
          click={save}
        />
      );
    }
  }

  function renderArchivedLabel(): React.ReactNode {
    if (store.state.selected.isArchived) {
      return (
        <Button
          className="button-label p-button-text p-button-danger"
          label="ARCHIVED"
          disabled
        />
      );
    }
  }

  function renderMenuButton(): React.ReactNode {
    if (isEditMode) {
      return (
        <Button
          className="p-button-sm p-button-rounded"
          icon={PrimeIcons.TIMES}
          onClick={removeEditMode}
        />
      );
    }

    if (actionsMenuItemsProps) {
      return (
        <EntityActionsMenuContainer
          entity={store.state.selected}
          actionsMenuItemsProps={actionsMenuItemsProps}
          isEntityPage
        />
      );
    }
  }

  return (
    <div className="flex gap-4">
      { renderSaveButton() }

      { renderArchivedLabel() }

      { renderMenuButton() }
    </div>
  );

}
