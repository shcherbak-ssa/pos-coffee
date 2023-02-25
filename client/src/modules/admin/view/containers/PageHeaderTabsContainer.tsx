import { useEffect, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppStore, AppController } from '@admin/shared/types';
import { ControllerName, ListTab, StoreName } from '@admin/shared/constants';

export type Props = {};

export function PageHeaderTabsContainer({}: Props) {

  const [ currentTabIndex, setCurrentTabIndex ] = useState<number>(ZERO);

  const { state: { currentPage, view } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const tabs: MenuItem[] =  [
    {
      label: 'Active',
      data: { listTab: ListTab.ACTIVE },
      command: () => {
        appController.updateViewState('listTab', ListTab.ACTIVE);
      },
    },
    {
      label: 'Archived',
      data: { listTab: ListTab.ARCHIVED },
      command: () => {
        appController.updateViewState('listTab', ListTab.ARCHIVED);
      },
    },
  ];

  useEffect(() => {
    const index: number = tabs.findIndex(({ data }) => data.listTab === view.listTab);

    if (index >= ZERO) {
      setCurrentTabIndex(index);
    }
  }, [currentPage.title]);

  return (
    <div className="page-tabs absolute top-0 left-1/2 -translate-x-1/2 h-full">
      <TabMenu
        model={tabs}
        activeIndex={currentTabIndex}
        onTabChange={(e) => setCurrentTabIndex(e.index)}
      />
    </div>
  );

}
