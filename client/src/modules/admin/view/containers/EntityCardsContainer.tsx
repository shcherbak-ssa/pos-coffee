import type { Entity } from 'shared/types';
import { EntityActionsMenuContainer } from './EntityActionsMenuContainer';

export type Props = {
  entities: Entity[];
}

export function EntityCardsContainer({ entities }: Props) {

  return (
    <div className="full p-6 grid grid-cols-4 gap-4">
      {
        entities.map((entity) => {
          return (
            <div className="card relative" key={entity.id}>
              <div
                className="click full"
                data-user-id={entity.id}
                // @ts-ignore
                onClick={focusCard}
                onDoubleClick={() => selectUser(entity)}
              >
                <UserPersonalInfo className="!py-12" user={entity} />
              </div>

              <div className="card-menu absolute top-4 right-4">
                <EntityActionsMenuContainer {...entity} />
              </div>

              <div className="absolute top-4 left-4">
                {
                  isSelectEnable
                    ? <Checkbox
                        checked={selectedUserIds.includes(entity.id)}
                        onChange={(e) => select(entity)}
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
