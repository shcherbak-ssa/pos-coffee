import type { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';

import type { Entity, CrudController } from 'shared/types';
import type { EntityName } from 'shared/constants';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { AppController } from '@admin/shared/types';
import { Action, ControllerName, PagePath } from '@admin/shared/constants';
import { confirmDialogConfig } from '@admin/shared/configs/confirm-dialog';

export type OverrideFunction = (item: MenuItem, entity: Entity) => MenuItem

export type Props = {
  entityName: EntityName;
  infoPagePath: PagePath;
  controllerName: ControllerName;
  overrides?: { [key in Action]?: OverrideFunction };
}

export function useActionsMenuItems({
  entityName,
  infoPagePath,
  controllerName,
  overrides = {},
  entity,
  isEntityPage,
}: Props & {
  entity: Entity,
  isEntityPage: boolean
}): MenuItem[] {

  const appController = useController(ControllerName.APP) as AppController;
  const controller = useController(controllerName) as CrudController;

  const toInfoPage: NavigateFunctionHook = useNavigateWithParams(infoPagePath);

  const items: MenuItem[] = [
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
      visible: !entity.isArchived,
      data: { action: Action.EDIT },
      command: () => {
        appController.setIsEditMode(true);
      },
    },
    {
      label: 'Archive',
      icon: PrimeIcons.INBOX,
      visible: !entity.isArchived,
      data: { action: Action.ARCHIVE },
      command: () => {
        confirmDialog({
          ...confirmDialogConfig.archive,
          message: `Are you sure you want to archive this ${entityName.toLowerCase()}?`,
          accept: () => {
            controller.archive(entity.id);
          },
        });
      },
    },
    {
      label: 'Restore',
      icon: PrimeIcons.REPLAY,
      visible: entity.isArchived as boolean,
      data: { action: Action.RESTORE },
      command: () => {
        confirmDialog({
          ...confirmDialogConfig.restore,
          message: `Are you sure you want to restore this ${entityName.toLowerCase()}?`,
          accept: () => {
            controller.restore(entity.id);
          },
        });
      },
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TRASH,
      visible: false,
      data: { action: Action.DELETE },
      command: () => {},
    },
  ].map((item) => {
    const overrideItem: OverrideFunction | undefined = overrides[item.data.action];

    return overrideItem ? overrideItem(item, entity) : item;
  });

  return items;

}
