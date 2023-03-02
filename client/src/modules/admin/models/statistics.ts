import { ZERO } from 'shared/constants';

import type { Statistics as BaseStatistics, StatisticsCountPerDay, TotalOrdersStatistics } from '@admin/shared/types';

export class Statistics implements BaseStatistics {
  public total: TotalOrdersStatistics;
  public averageIncome: number;
  public averageOrders: number;
  public countsPerDay: StatisticsCountPerDay[];

  private constructor(statistics?: BaseStatistics) {
    this.total = statistics?.total
      ? { ...statistics.total }
      : { orders: ZERO, income: ZERO };

    this.averageIncome = statistics?.averageIncome || ZERO;
    this.averageOrders = statistics?.averageOrders || ZERO;
    this.countsPerDay = statistics?.countsPerDay ? [ ...statistics.countsPerDay ] : [];
  }

  public static create(statistics?: BaseStatistics): Statistics {
    return new Statistics(statistics);
  }
}
