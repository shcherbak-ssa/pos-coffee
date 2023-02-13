import { useEffect } from 'react';
import classnames from 'classnames';

import { updatePageTitle } from 'shared/utils';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppController, AppStore } from 'modules/admin/shared/types';
import { ControllerName, PageTitle, StoreName } from 'modules/admin/shared/constants';
import { AppMenuContainer } from 'modules/admin/view/containers/AppMenuContainer';
import { PageHeaderContainer } from 'modules/admin/view/containers/PageHeaderContainer';
import { ScrollPanel } from 'primereact/scrollpanel';

export type Props = {
  pageTitle: PageTitle;
  children: React.ReactNode;
}

export function PageLayout({ pageTitle, children }: Props) {

  const appStore = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  useEffect(() => {
    updatePageTitle(pageTitle);

    appController.setCurrentPage({
      title: pageTitle,
    });
  }, [pageTitle]);


  return (
    <div className="full relative">
      <div
        className={classnames('w-60 h-full duration-200 relative z-10', {
          '-translate-x-60': !appStore.state.isAppMenuOpen,
        })}
      >
        <AppMenuContainer />
      </div>

      <div
        className={classnames('page-container full duration-200 absolute left-0 top-0', {
          'pl-60': appStore.state.isAppMenuOpen,
          'pl-0': !appStore.state.isAppMenuOpen,
        })}
      >
        <ScrollPanel style={{ width: '100%', height: '100%' }}>
          <PageHeaderContainer />

          <div className="p-4">
            { children }
          </div>
        </ScrollPanel>
      </div>
    </div>
  );

}
