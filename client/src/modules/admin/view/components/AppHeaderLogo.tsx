import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';

import type { EmptyFunction } from 'shared/types';
import { APP_NAME } from 'shared/constants';
import { IconButton } from 'view/components/IconButton';

export type Props = {
  isAppMenuOpen: boolean;
  click: EmptyFunction
  className?: string;
}

export function AppHeaderLogo({ isAppMenuOpen, click, className }: Props) {

  return (
    <div className={classnames('flex items-center', className)}>
      <IconButton
        className="mr-4"
        icon={isAppMenuOpen ? PrimeIcons.TIMES : PrimeIcons.BARS}
        click={click}
      />

      <h1 className="app-name text-2xl">
        { APP_NAME }
      </h1>
    </div>
  );

}
