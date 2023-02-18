import { type MouseEvent, useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';

import type { Entity, EntityComponentProps } from 'shared/types';
import { filterById } from 'shared/utils';

import type { EntityViewComponentProps } from '@admin/shared/types';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';

const CARD_CONTENT: string = 'card-content';
const CARD_ACTIVE: string = 'card-active';

export type Props<T extends Entity> = EntityViewComponentProps<T> & {
  EntityComponent: React.ComponentType<EntityComponentProps<T>>;
}

export function EntityCardsContainer<T extends Entity>({
  entities,
  selectEntity,
  EntityComponent,
  isSelectEnable,
  selectedEntities,
  setSelectedEntities,
  actionsMenuItemsProps,
}: Props<T>) {

  const [ lastFocusedCard, setLastFocusedCard ] = useState<HTMLElement>();

  useEffect(() => {
    const userCards: NodeListOf<HTMLElement> = document.querySelectorAll('.card .card-content');

    for (const user of userCards) {
      if (isEntitySelected({ id: Number(user.dataset.userId) } as T)) {
        user.classList.add(CARD_ACTIVE);
      } else {
        user.classList.remove(CARD_ACTIVE);
      }
    }
  }, [selectedEntities]);

  function isEntitySelected(entity: T): boolean {
    return selectedEntities.map(({ id }) => id).includes(entity.id);
  }

  function select(entity: T): void {
    removeLastFocus();

    if (isEntitySelected(entity)) {
      setSelectedEntities(filterById(selectedEntities, entity.id));
      return;
    }

    setSelectedEntities([...selectedEntities, entity]);
  }

  function focusCard(e: MouseEvent): void {
    e.preventDefault();

    if (isSelectEnable) {
      return;
    }

    removeLastFocus();

    const { classList } = e.target as HTMLElement;

    if (classList.contains(CARD_CONTENT)) {
      classList.add(CARD_ACTIVE);
      setLastFocusedCard(e.target as HTMLElement);
    }
  }

  function removeLastFocus(): void {
    if (lastFocusedCard) {
      lastFocusedCard.classList.remove(CARD_ACTIVE);
    }
  }

  function drawCheckbox(entity: T): React.ReactNode {
    if (isSelectEnable) {
      return (
        <Checkbox
          checked={isEntitySelected(entity)}
          onChange={() => select(entity)}
        />
      );
    }
  }

  return (
    <div className="full p-6 grid grid-cols-4 gap-4">
      {
        entities.map((entity) => (
          <div className="card relative" key={entity.id}>
            <div
              className="card-content click full"
              data-user-id={entity.id}
              onClick={focusCard}
              onDoubleClick={() => selectEntity(entity)}
            >
              <EntityComponent entity={entity} className="!py-12" />
            </div>

            <div className="card-menu absolute top-4 right-4">
              <EntityActionsMenuContainer
                entity={entity}
                isEntityPage={false}
                actionsMenuItemsProps={actionsMenuItemsProps}
              />
            </div>

            <div className="absolute top-4 left-4">
              { drawCheckbox(entity) }
            </div>
          </div>
        ))
      }
    </div>
  );

}
