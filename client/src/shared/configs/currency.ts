import { Currency } from 'shared/constants';

export const currencySymbols: { [key in Currency]: string } = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
};
