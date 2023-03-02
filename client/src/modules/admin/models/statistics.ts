import { ZERO } from 'shared/constants';

import type { AppStatistics, AppTotalStatistics } from '@admin/shared/types';

export class Statistics implements AppStatistics {
  public total: AppTotalStatistics;
  public averageIncome: number;
  public averageOrders: number;

  private constructor(statistics?: AppStatistics) {
    this.total = statistics?.total
      ? { ...statistics.total }
      : { orders: ZERO, income: ZERO };

    this.averageIncome = statistics?.averageIncome || ZERO;
    this.averageOrders = statistics?.averageOrders || ZERO;
  }

  public static create(statistics?: AppStatistics): Statistics {
    return new Statistics(statistics);
  }
}
