import type { MouseEvent } from 'react';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { EmptyFunction } from 'shared/types';

export type Props = {
  isLoading: boolean;
  click: EmptyFunction;
}

export function SaveButton({ isLoading, click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click();
  }

  return (
    <Button
      className="p-button-sm"
      icon={PrimeIcons.SAVE}
      label="Save"
      loading={isLoading}
      onClick={handleClick}
    />
  );

}
