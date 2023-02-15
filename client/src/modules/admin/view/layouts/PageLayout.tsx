import { useEffect } from 'react';
import classnames from 'classnames';
import { ScrollPanel } from 'primereact/scrollpanel';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { updatePageTitle } from 'shared/utils';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { NotificationContainer } from 'view/containers/NotificationContainer';

import type { AppController, AppPageSchema, AppStore } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { AppMenuContainer } from '@admin/view/containers/app/AppMenuContainer';
import { AppHeaderContainer } from '@admin/view/containers/app/AppHeaderContainer';

export type Props = {
  page: AppPageSchema;
  children: React.ReactNode;
}

export function PageLayout({ page, children }: Props) {

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  useEffect(() => {
    updatePageTitle(page.title);
  }, [page]);

  function closeMenu(): void {
    appController.setIsAppMenuOpen(false);
  }

  return (
    <div className="app-container full relative">
      <AppHeaderContainer />

      <div
        className={classnames('app-menu-container duration-200 h-full absolute top-0 z-30 lg:z-10', {
          'is-open': isAppMenuOpen,
          'is-close': !isAppMenuOpen,
        })}
      >
        <AppMenuContainer />
      </div>

      <ScrollPanel style={{ width: '100%', height: 'calc(100% - 6rem)' }}>
        <div
          className={classnames('p-12 duration-200', {
            'lg:pl-72': isAppMenuOpen,
            'lg:pl-36': !isAppMenuOpen,
          })}
        >
          { children }
        </div>
      </ScrollPanel>

      <div
        className={classnames('app-menu-overlay fixed top-0 left-0 z-10 full', {
          'block lg:hidden': isAppMenuOpen,
          'hidden': !isAppMenuOpen,
        })}
        onClick={closeMenu}
      />

      <NotificationContainer />
      <ConfirmDialog />
    </div>
  );

}
