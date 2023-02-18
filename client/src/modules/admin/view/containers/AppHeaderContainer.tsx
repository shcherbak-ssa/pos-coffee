import { PrimeIcons } from 'primereact/api';

import type { UserSchema } from 'shared/types';
import { APP_NAME } from 'shared/constants';
import { IconButton } from 'view/components/IconButton';

import type { AppComponentProps } from '@admin/shared/types';
import { UsersPhoto } from '../components/UsersPhoto';

export type Props = AppComponentProps & {
  currentUser: UserSchema;
};

export function AppHeaderContainer({ isAppMenuOpen, appController, currentUser }: Props) {

  function toggleAppMenu(): void {
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
          click={toggleAppMenu}
        />

        <h1 className="app-name text-2xl">{ APP_NAME }</h1>
      </div>

      <div className="flex items-center click">
        <UsersPhoto
          size="large"
          photo={currentUser.photo}
        />
      </div>
    </header>
  );

}
