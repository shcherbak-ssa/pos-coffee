import { MouseEvent, useEffect, useState } from 'react';
import { type Location, type NavigateFunction, useLocation, useNavigate } from 'react-router';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { Entity } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { EventEmitter } from 'shared/helpers/event-emitter';

import { PagePathLabel, TO_BACK, ViewEvent } from '@admin/shared/constants';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';

export type Props = {
  entity: Entity;
}

export function PageHeaderEntityActionsContainer({ entity }: Props) {

  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const { pathname } = location;

    setIsEditMode(
      pathname.endsWith(PagePathLabel.CREATE) ||
      pathname.endsWith(PagePathLabel.EDIT)
    );
  }, [location.pathname]);

  function save(e: MouseEvent): void {
    e.preventDefault();

    if (isSaveProcessing || !isEditMode) {
      return;
    }

    setIsSaveProcessing(true);

    EventEmitter.get().emit(ViewEvent.SAVE)
      .then(() => {
        setIsSaveProcessing(false);
      });
  }

  function goBack(e: MouseEvent): void {
    e.preventDefault();

    navigate(TO_BACK);
  }

  return (
    <div className="flex gap-4">
      {
        isEditMode && !entity.isDeleted
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
        !!entity.isDeleted
          ? <Button
              className="button-label p-button-text p-button-danger"
              label="DELETED"
              disabled
            />
          : EMPTY_STRING
      }

      {
        isEditMode
          ? <Button
              className="p-button-sm"
              icon={PrimeIcons.TIMES}
              onClick={goBack}
            />
          : <EntityActionsMenuContainer
              entity={entity}
              isEntityPage
            />
      }
    </div>
  );

}
