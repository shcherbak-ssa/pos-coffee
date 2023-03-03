import { useEffect, useState } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart } from 'primereact/chart';

import { useStore } from 'view/hooks/store';
import { CardWrapper } from 'view/components/CardWrapper';
import { CardHeading } from 'view/components/CardHeading';

import type { AppStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { getChartOptions } from '@admin/shared/helpers/chart';

export function HomeTopsContainer() {

  const [ chartBestsellersData, setChartBestsellersData ] = useState<ChartData>();
  const [ chartTopIngnoredData, setChartTopIngnoredData ] = useState<ChartData>();
  const [ chartOptions, setChartOptions ] = useState<ChartOptions>();

  const { state: { statistics } } = useStore(StoreName.APP) as AppStore;

  useEffect(() => {
    const options: ChartOptions = getChartOptions();
    const { bestsellers, topIgnored: topIngnored } = statistics;

    setChartOptions({ plugins: options.plugins });

    setChartBestsellersData({
      labels: bestsellers.map(({ name }) => name),
      datasets: [{ data: bestsellers.map(({ count }) => count) }],
    });

    setChartTopIngnoredData({
      labels: topIngnored.map(({ name }) => name),
      datasets: [{ data: topIngnored.map(({ count }) => count) }],
    });
  }, [statistics.bestsellers, statistics.topIgnored]);

  return (
    <div className='full grid grid-cols-1 gap-6'>
      <CardWrapper>
        <CardHeading className="mb-6" heading="Bestsellers" />

        <Chart
          type="pie"
          data={chartBestsellersData}
          options={chartOptions}
        />
      </CardWrapper>

      <CardWrapper>
        <CardHeading className="mb-6" heading="Top ignored" />

        <Chart
          type="pie"
          data={chartTopIngnoredData}
          options={chartOptions}
        />
      </CardWrapper>
    </div>
  );

}
