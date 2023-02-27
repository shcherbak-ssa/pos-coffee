import { PrimeIcons } from 'primereact/api';

import type { PaymentMethod } from 'shared/types';
import { PaymentMethodType } from 'shared/constants';

export const paymentMethods: PaymentMethod[] = [
  {
    type: PaymentMethodType.CASH,
    label: 'Cash',
    icon: PrimeIcons.MONEY_BILL,
  },
  {
    type: PaymentMethodType.CARD,
    label: 'Card',
    icon: PrimeIcons.CREDIT_CARD,
  },
  {
    type: PaymentMethodType.MISC,
    label: 'Misc',
    icon: PrimeIcons.CHART_PIE,
  },
];
