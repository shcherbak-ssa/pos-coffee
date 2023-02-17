import { useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';

import type { UserSchema } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { filterItemById } from 'shared/utils';

import { CssClasses } from '@admin/shared/constants';
import { UsersPersonalCard } from '@admin/view/components/UsersPersonalCard';
import { UsersActionsMenuContainer } from '@admin/view/containers/users/UsersActionsMenuContainer';

export type Props = {
  users: UserSchema[];
  selectedUsers: UserSchema[];
  isSelectEnable: boolean;
  setSelectedUsers: (users: UserSchema[]) => void;
  selectUser: (user: UserSchema) => void;
}

export function UsersPageCardsContainer({
  users,
  selectedUsers,
  isSelectEnable,
  setSelectedUsers,
  selectUser,
}: Props) {

  const [ lastFocusedCard, setLastFocusedCard ] = useState<HTMLElement>();

  const selectedUserIds: number[] = selectedUsers.map(({ id }) => id);

  useEffect(() => {
    const userCards: NodeListOf<HTMLElement> = document.querySelectorAll('.card .click');

    for (const user of userCards) {
      if (selectedUserIds.includes(Number(user.dataset.userId))) {
        user.classList.add(CssClasses.CARD_ACTIVE);
      } else {
        user.classList.remove(CssClasses.CARD_ACTIVE);
      }
    }
  }, [selectedUsers]);

  function select(user: UserSchema): void {
    removeLastFocus();

    if (selectedUserIds.includes(user.id)) {
      setSelectedUsers(filterItemById(selectedUsers, user));
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  }

  function focusCard(e: MouseEvent): void {
    e.preventDefault();

    if (isSelectEnable) {
      return;
    }

    removeLastFocus();

    // @ts-ignore
    const { classList } = e.target;

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
        users.map((user) => {
          return (
            <div className="card relative" key={user.id}>
              <div
                className="click full"
                data-user-id={user.id}
                // @ts-ignore
                onClick={focusCard}
                onDoubleClick={() => selectUser(user)}
              >
                <UsersPersonalCard className="!py-12" entity={user} />
              </div>

              <div className="card-menu absolute top-4 right-4">
                <UsersActionsMenuContainer {...user} />
              </div>

              <div className="absolute top-4 left-4">
                {
                  isSelectEnable
                    ? <Checkbox
                        checked={selectedUserIds.includes(user.id)}
                        onChange={(e) => select(user)}
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
