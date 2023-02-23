import { MouseEvent, useEffect, useState } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { CrudController, Entity } from 'shared/types';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import { PagePathLabel, GO_BACK } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';
import { SaveButton } from '@admin/view/components/SaveButton';

export type Props = {
  entity: Entity;
  actionsMenuItemsProps?: ActionsMenuItemsProps;
  controllerName: string;
  infoPagePath: string;
}

export function PageHeaderActionsContainer({
  entity,
  actionsMenuItemsProps,
  controllerName,
  infoPagePath,
}: Props) {

  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const controller = useController(controllerName) as CrudController;
  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(infoPagePath);

  useEffect(() => {
    const { pathname } = location;

    setIsEditMode(
      pathname.endsWith(PagePathLabel.CREATE) ||
      pathname.endsWith(PagePathLabel.EDIT)
    );
  }, [location.pathname]);

  function save(): void {
    if (isSaveProcessing || !isEditMode || !controller) {
      return;
    }

    setIsSaveProcessing(true);

    controller.save(entity)
      .then((saveEntityId) => {
        if (saveEntityId && toInfoPage) {
          toInfoPage({ id: saveEntityId });
        }

        setIsSaveProcessing(false);
      });
  }

  function goBack(e: MouseEvent): void {
    e.preventDefault();

    navigate(GO_BACK);
  }

  function drawSaveButton(): React.ReactNode {
    if (isEditMode) {
      return (
        <SaveButton
          isLoading={isSaveProcessing}
          click={save}
        />
      );
    }
  }

  function drawArchivedLabel(): React.ReactNode {
    if (entity.isArchived) {
      return (
        <Button
          className="button-label p-button-text p-button-danger"
          label="ARCHIVED"
          disabled
        />
      );
    }
  }

  function drawMenuButton(): React.ReactNode {
    if (isEditMode) {
      return (
        <Button
          className="p-button-sm p-button-rounded"
          icon={PrimeIcons.TIMES}
          onClick={goBack}
        />
      );
    }

    if (actionsMenuItemsProps) {
      return (
        <EntityActionsMenuContainer
          entity={entity}
          actionsMenuItemsProps={actionsMenuItemsProps}
          isEntityPage
        />
      );
    }
  }

  return (
    <div className="flex gap-4">
      { drawSaveButton() }

      { drawArchivedLabel() }

      { drawMenuButton() }
    </div>
  );

}
