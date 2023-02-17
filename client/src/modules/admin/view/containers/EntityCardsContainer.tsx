import { type MouseEvent, useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';

import type { Entity, EntityComponentProps } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { filterItemById } from 'shared/utils';

import type { ActionMenuItemOverride } from '@admin/shared/types';
import { CssClasses } from '@admin/shared/constants';
import { EntityActionsMenuContainer } from '@admin/view/containers/EntityActionsMenuContainer';

export type Props<T> = {
  entities: T[];
  overrideActionItems: ActionMenuItemOverride[];
  selectEntity: (entity: T) => void;
  EntityComponent: React.ComponentType<EntityComponentProps<T>>;
  isSelectEnable: boolean;
  selectedEntities: T[];
  setSelectedEntities: (entities: T[]) => void;
}

export function EntityCardsContainer<T extends Entity>({
  entities,
  overrideActionItems,
  selectEntity,
  EntityComponent,
  isSelectEnable,
  selectedEntities,
  setSelectedEntities,
}: Props<T>) {

  const [ lastFocusedCard, setLastFocusedCard ] = useState<HTMLElement>();

  useEffect(() => {
    const userCards: NodeListOf<HTMLElement> = document.querySelectorAll('.card .card-content');

    for (const user of userCards) {
      if (isEntitySelected({ id: Number(user.dataset.userId) } as T)) {
        user.classList.add(CssClasses.CARD_ACTIVE);
      } else {
        user.classList.remove(CssClasses.CARD_ACTIVE);
      }
    }
  }, [selectedEntities]);

  function isEntitySelected(entity: T): boolean {
    return selectedEntities.map(({ id }) => id).includes(entity.id);
  }

  function select(entity: T): void {
    removeLastFocus();

    if (isEntitySelected(entity)) {
      setSelectedEntities(filterItemById(selectedEntities, entity));
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

    if (classList.contains(CssClasses.CARD_CONTENT)) {
      classList.add(CssClasses.CARD_ACTIVE);
      setLastFocusedCard(e.target as HTMLElement);
    }
  }

  function removeLastFocus(): void {
    if (lastFocusedCard) {
      lastFocusedCard.classList.remove(CssClasses.CARD_ACTIVE);
    }
  }

  return (
    <div className="full p-6 grid grid-cols-4 gap-4">
      {
        entities.map((entity) => {
          return (
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
                  overrideItems={overrideActionItems}
                  entity={entity}
                />
              </div>

              <div className="absolute top-4 left-4">
                {
                  isSelectEnable
                    ? <Checkbox
                        checked={isEntitySelected(entity)}
                        onChange={() => select(entity)}
                      />
                    : EMPTY_STRING
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );

}
