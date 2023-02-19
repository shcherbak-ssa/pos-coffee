import { PrimeIcons } from 'primereact/api';

import type { OptionItem } from '@admin/shared/types';
import { ListAction, ListView } from '@admin/shared/constants';

export const listViewOptions: OptionItem[] = [
  {
    icon: PrimeIcons.LIST,
    value: ListView.TABLE,
  },
  {
    icon: PrimeIcons.TH_LARGE,
    value: ListView.CARD,
  },
];

export const listActionOptions: OptionItem[] = [
  {
    icon: PrimeIcons.CHECK_SQUARE,
    value: ListAction.SELECT,
    label: 'Select',
  },
  {
    icon: PrimeIcons.FILTER,
    value: ListAction.FILTER,
    label: 'Filter',
  },
];
