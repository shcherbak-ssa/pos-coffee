import { useEffect, useState } from 'react';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { AppLoader } from 'view/components/AppLoader';

import type { AppStore, AppController } from '@admin/shared/types';
import { StoreName, ControllerName } from '@admin/shared/constants';
import { HomeHeaderContainer } from '@admin/view/containers/HomeHeaderContainer';
import { HomeChartContainer } from '@admin/view/containers/HomeChartContainer';
import { HomeTopsContainer } from '@admin/view/containers/HomeTopsContainer';
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
          <div className="grid grid-cols-3 gap-6 p-6 full">
            <div className="grid grid-cols-1 gap-6 col-span-2">
              <HomeStatWidgetList
                statistics={statistics}
                settings={settings}
              />

              <div>
                <HomeChartContainer />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 col-span-1">
              <HomeTopsContainer />
            </div>
          </div>
        </PageWrapper>
      </div>
    );
  }

  return <AppLoader />;

}
