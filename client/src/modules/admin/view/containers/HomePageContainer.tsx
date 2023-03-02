import { useEffect, useState } from 'react';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { AppStore, AppController } from '@admin/shared/types';
import { StoreName, ControllerName } from '@admin/shared/constants';
import { HomeHeaderContainer } from '@admin/view/containers/HomeHeaderContainer';
import { HomePageChartContainer } from '@admin/view/containers/HomePageChartContainer';
import { PageWrapper } from '@admin/view/components/PageWrapper';
import { HomeStatWidgetList } from '@admin/view/components/HomeStatWidgetList';

export function HomePageContainer() {

  const [ isStatisticsLoaded, setIsStatisticsLoaded ] = useState<boolean>(false);

  const { state: { statistics, settings } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  useEffect(() => {
    setIsStatisticsLoaded(false);

    appController.loadStatistics()
      .then(() => {
        setIsStatisticsLoaded(true);
      })
  }, []);

  if (isStatisticsLoaded) {
    return (
      <div className="full">
        <HomeHeaderContainer />

        <PageWrapper>
          <div className="grid grid-cols-1 gap-6 p-6 full">
            <HomeStatWidgetList statistics={statistics} settings={settings} />

            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <HomePageChartContainer />
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }

  return <AppLoader />;

}
