import { PrimeIcons } from 'primereact/api';

import type { SettingsSchema } from 'shared/types';
import { BasePrice } from 'view/components/BasePrice';

import type { Statistics } from '@admin/shared/types';
import { HomeStatWidget } from '@admin/view/components/HomeStatWidget';

export type Props = {
  statistics: Statistics;
  settings: SettingsSchema;
}

export function HomeStatWidgetList({ statistics, settings }: Props) {

  return (
    <div className="grid grid-cols-3 gap-6">
      <HomeStatWidget
        label="Orders / Average orders"
        icon={PrimeIcons.SHOPPING_BAG}
        value={`${statistics.total.orders} / ${statistics.averageOrders}`}
      />

      <HomeStatWidget
        label="Total income"
        icon={PrimeIcons.MONEY_BILL}
        value={(
          <BasePrice
            price={statistics.total.income}
            currency={settings.currency}
            useSymbol
          />
        )}
      />

      <HomeStatWidget
        label="Average income"
        icon={PrimeIcons.CHART_BAR}
        value={(
          <BasePrice
            price={statistics.averageIncome}
            currency={settings.currency}
            useSymbol
          />
        )}
      />
    </div>
  );

}
