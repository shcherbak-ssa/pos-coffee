import type { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';

import type { Entity, CrudController } from 'shared/types';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import { Action, ControllerName, PagePath } from '@admin/shared/constants';

export type OverrideFunction = (item: MenuItem, entity: Entity) => MenuItem

export type Props = {
  infoPagePath: PagePath;
  editPagePath: PagePath;
  controllerName: ControllerName;
  overrides?: { [key in Action]?: OverrideFunction };
}

export function useActionsMenuItems({
  infoPagePath,
  editPagePath,
  controllerName,
  overrides = {},
  entity,
  isEntityPage,
}: Props & {
  entity: Entity,
  isEntityPage: boolean
}): MenuItem[] {

  const controller = useController(controllerName) as CrudController;
  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(infoPagePath);
  const toEditPage: NavigateFunctionHook = useNavigateWithParams(editPagePath);

  return [
    {
      label: 'View',
      icon: PrimeIcons.EYE,
      visible: !isEntityPage,
      data: { action: Action.VIEW },
      command: () => {
        toInfoPage({ id: entity.id });
      },
    },
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      visible: !entity.isDeleted,
      data: { action: Action.EDIT },
      command: () => {
        toEditPage({ id: entity.id });
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: !entity.isDeleted,
      data: { action: Action.DELETE },
      command: () => {
        confirmDialog({
          header: 'Confirmation',
          message: 'Are you sure you want to delete this user?',
          icon: PrimeIcons.EXCLAMATION_TRIANGLE,
          acceptClassName: 'p-button-danger',
          accept: () => {
            controller.delete(entity.id);
          },
        });
      }
    },
    {
      label: 'Restore',
      icon: PrimeIcons.REPLAY,
      visible: entity.isDeleted as boolean,
      data: { action: Action.RESTORE },
      command: () => {
        confirmDialog({
          header: 'Confirmation',
          message: 'Are you sure you want to restore this user?',
          icon: PrimeIcons.INFO_CIRCLE,
          accept: () => {
            controller.restore(entity.id);
          },
        });
      }
    },
  ].map((item) => {
    const overrideItem: OverrideFunction | undefined = overrides[item.data.action];

    return overrideItem ? overrideItem(item, entity) : item;
  });

}
