import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { confirmPopup } from 'primereact/confirmpopup';

import { UsersImage } from 'view/components/UsersImage';

import type { UserSchema } from '@app/shared/types';

export type Props = {
  user: UserSchema;
  className?: string;
  type?: 'Manager' | 'Cashier';
  click?: (user: UserSchema) => void;
  cancel?: (user: UserSchema) => void;
}

export function AppUser({ user, className, type, click, cancel }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    if (click) {
      click(user);
    }
  }

  function handleCancel(e: MouseEvent): void {
    e.preventDefault();

    if (cancel) {
      confirmPopup({
        // @ts-ignore
        target: e.currentTarget,
        message: 'Do you want to remove this user?',
        icon: PrimeIcons.TIMES_CIRCLE,
        acceptClassName: 'p-button-danger',
        accept: () => {
          cancel(user);
        },
      });
    }
  }

  function renderType(): React.ReactNode {
    if (type) {
      return (
        <Tag
          className="p-0.5 text-xs"
          severity={type === 'Cashier' ? 'warning' : 'info'}
          value={type}
        />
      );
    }
  }

  function renderCancelButton(): React.ReactNode {
    if (cancel) {
      return (
        <Button
          className="p-button-sm p-button-text p-button-rounded absolute top-1/2 right-2 -translate-y-1/2 z-10 opacity-0"
          icon={PrimeIcons.TIMES}
          onClick={handleCancel}
        />
      );
    }
  }

  return (
    <div
      className={classnames('app-user rounded-lg flex items-center gap-4 hover:bg-gray-100 p-2 click', className)}
      onClick={handleClick}
    >
      <UsersImage image={user.image} />

      <div>
        <h2>{ `${user.name} ${user.surname}` }</h2>

        { renderType() }
      </div>

      { renderCancelButton() }
    </div>
  );

}
