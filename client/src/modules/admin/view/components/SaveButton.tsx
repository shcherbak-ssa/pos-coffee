import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { EmptyFunction } from 'shared/types';

export type Props = {
  isLoading: boolean;
  click: EmptyFunction;
  className?: string;
}

export function SaveButton({ className, isLoading, click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click();
  }

  return (
    <Button
      className={classnames('p-button-sm', className)}
      icon={PrimeIcons.SAVE}
      label="Save"
      loading={isLoading}
      onClick={handleClick}
    />
  );

}
