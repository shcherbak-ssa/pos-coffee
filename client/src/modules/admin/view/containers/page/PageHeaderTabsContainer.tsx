import { useEffect, useState } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { TabMenu, type TabMenuTabChangeEvent } from 'primereact/tabmenu';

import { LocalStorageKey, ZERO } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';

import type { LastListPageTabPayload } from '@admin/shared/types';
import type { Tab } from '@admin/shared/constants';

export type Props = {
  tabs: MenuItem[];
  currentTab: Tab;
  tabChange: (tab: Tab) => void;
}

export function PageHeaderTabsContainer({ tabs, currentTab, tabChange }: Props) {

  const [ activeTabIndex, setActiveTabIndex ] = useState<number>(ZERO);

  useEffect(() => {
    const index: number | undefined = tabs.findIndex(({ data }) => data.tab === currentTab);

    if (index) {
      setActiveTabIndex(index);
    }
  }, [currentTab]);

  function handleTabChange({ index }: TabMenuTabChangeEvent): void {
    setActiveTabIndex(index);

    const { tab } = tabs[index].data;

    tabChange(tab);
    LocalStorage.set<LastListPageTabPayload>(LocalStorageKey.LAST_LIST_PAGE_TAB, { user: tab });
  }

  return (
    <TabMenu
      model={tabs}
      activeIndex={activeTabIndex}
      onTabChange={handleTabChange}
    />
  );

}
