import type { MouseEvent } from 'react';

import type { EmptyFunction } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { UsersImage } from 'view/components/UsersImage';

export type Props = {
  click: EmptyFunction;
}

export function AppUserEmptyCashier({ click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click();
  }

  return (
    <div
      className="border-2 border-dotted border-gray-300 rounded-lg flex items-center gap-4 hover:bg-gray-100 p-2 click"
      onClick={handleClick}
    >
      <UsersImage image={EMPTY_STRING} />

      <div className="opacity-80">Cashier not defined</div>
    </div>
  );

}
