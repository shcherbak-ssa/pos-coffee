import { useEffect, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { TabMenu } from 'primereact/tabmenu';

import { ZERO } from 'shared/constants';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { PageComponentProps, TabItem } from '@admin/shared/types';

export type Props = PageComponentProps & {
  tabs: TabItem[];
}

export function PageHeaderTabsContainer({ view, appController, tabs }: Props) {

  const [ tabItems, setTabItems ] = useState<MenuItem[]>([]);
  const [ currentTabIndex, setCurrentTabIndex ] = useState<number>(ZERO);

  useEffect(() => {
    setTabItems([
      ...tabs.map(({ label, listTab, command }, index) => ({
        label,
        command: () => {
          setCurrentTabIndex(index);

          if (view.listTab === listTab) return;

          appController.updateViewState('listTab', listTab);
          command();
        },
      }))
    ]);
  }, [tabs]);

  useEffect(() => {
    const index: number = tabs.findIndex(({ listTab }) => listTab === view.listTab);

    if (index >= ZERO) {
      setCurrentTabIndex(index);
    }
  }, []);

  if (tabItems.length) {
    return (
      <div className="page-tabs absolute top-0 left-1/2 -translate-x-1/2 h-full">
        <TabMenu model={tabItems} activeIndex={currentTabIndex} />
      </div>
    );
  }

  return <EmptyComponent />;

}
