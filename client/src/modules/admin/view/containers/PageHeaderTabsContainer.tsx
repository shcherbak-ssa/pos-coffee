import { useEffect, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

import { ZERO } from 'shared/constants';

import type { PageComponentProps } from '@admin/shared/types';
import { ListTab } from '@admin/shared/constants';

export type Props = PageComponentProps;

export function PageHeaderTabsContainer({ appStore, appController }: Props) {

  const [ currentTabIndex, setCurrentTabIndex ] = useState<number>(ZERO);

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
    const index: number = tabs.findIndex(({ data }) => data.listTab === appStore.state.view.listTab);

    if (index >= ZERO) {
      setCurrentTabIndex(index);
    }
  }, [appStore.state.currentPage.title]);

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
