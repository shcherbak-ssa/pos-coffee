import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { Button } from 'primereact/button';

import { EMPTY_STRING } from 'shared/constants';

export type Props = {
  icon: string;
  click: (e: MouseEvent) => void;
  className?: string;
}

export function IconButton({ icon, click, className = EMPTY_STRING }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click(e);
  }

  return (
    <Button
      className={
        classnames(
          'icon-button p-button-rounded p-button-text duration-200',
          className,
        )
      }
      icon={icon}
      onClick={handleClick}
    />
  );

}
