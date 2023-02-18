import { PrimeIcons } from 'primereact/api';

import { APP_NAME } from 'shared/constants';
import { IconButton } from 'view/components/IconButton';

import type { AppComponentProps } from '@admin/shared/types';

export type Props = AppComponentProps;

export function AppHeaderContainer({ isAppMenuOpen, appController }: Props) {

  function toggleMenu(): void {
    appController.setIsAppMenuOpen(!isAppMenuOpen);
  }

  return (
    <header className="
      app-header border-b-2
      flex items-center justify-between
      px-10 lg:px-6 h-24 w-full
      relative z-10 lg:z-30
    ">
      <div className="flex items-center">
        <IconButton
          className="mr-6"
          icon={isAppMenuOpen ? PrimeIcons.TIMES : PrimeIcons.BARS}
          click={toggleMenu}
        />

        <h1 className="app-name text-2xl">{ APP_NAME }</h1>
      </div>
    </header>
  );

}
