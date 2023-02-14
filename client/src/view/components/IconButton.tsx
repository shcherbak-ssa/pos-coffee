import classnames from 'classnames';
import { Button } from 'primereact/button';

import { EMPTY_STRING } from 'shared/constants';

export type Props = {
  className?: string;
  icon: string;
  click: (e: MouseEvent) => void;
}

export function IconButton({ className = EMPTY_STRING, icon, click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click(e);
  }

  return (
    <Button
      className={
        classnames(
          'icon-button p-button-raised p-button-rounded p-button-text duration-200',
          className,
        )
      }
      icon={icon}
      // @ts-ignore
      onClick={handleClick}
    />
  );

}
