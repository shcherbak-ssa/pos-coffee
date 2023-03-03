import { useEffect, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';

import { useStore } from 'view/hooks/store';
import { CardWrapper } from 'view/components/CardWrapper';
import { CardHeading } from 'view/components/CardHeading';

import type { AppStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { getChartData, getChartOptions } from '@admin/view/helpers/chart';

export function HomeChartContainer() {

  const [ chartData, setChartData ] = useState<ChartData>();
  const [ chartOptions, setChartOptions ] = useState<ChartOptions>();

  const { state: { statistics } } = useStore(StoreName.APP) as AppStore;

  useEffect(() => {
    const data: ChartData = getChartData();
    const options: ChartOptions = getChartOptions();

    const { countsPerDay } = statistics;

    setChartOptions(options);

    setChartData({
      labels: countsPerDay.map(({ workDay }) => new Date(workDay).toLocaleDateString()),
      datasets: [
        {
          ...data.datasets[0],
          data: countsPerDay.map(({ income }) => income),
        },
        {
          ...data.datasets[1],
          data: countsPerDay.map(({ orders }) => orders),
        },
      ],
    });
  }, [statistics.countsPerDay]);

  return (
    <CardWrapper className="full">
      <CardHeading heading="Income & Orders" />

      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
      />
    </CardWrapper>
  );

}
