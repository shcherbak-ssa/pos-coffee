import { MouseEvent, useState } from 'react';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { Entity } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';

import type { ActionMenuItemOverride } from '@admin/shared/types';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';

export type Props = {
  overrideItems: ActionMenuItemOverride[];
  entity?: Entity;
  isEditMode?: boolean;
  isDeleted?: boolean;
}

export function PageHeaderEntityActionsContainer({
  overrideItems,
  entity,
  isEditMode = false,
  isDeleted = false,
}: Props) {

  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  function save(e: MouseEvent): void {
    e.preventDefault();

    if (isSaveProcessing || !isEditMode) {
      return;
    }

    setIsSaveProcessing(true);
  }

  return (
    <div className="flex gap-4">
      {
        isEditMode && !isDeleted
          ? <Button
              className="p-button-sm"
              icon={PrimeIcons.SAVE}
              label="Save"
              loading={isSaveProcessing}
              onClick={save}
            />
          : EMPTY_STRING
      }

      {
        isDeleted
          ? <Button
              className="button-label p-button-text p-button-danger"
              label="DELETED"
              disabled
            />
          : EMPTY_STRING
      }

      <EntityActionsMenuContainer
        overrideItems={overrideItems}
        entity={entity}
        isEntityPage
      />
    </div>
  );

}
