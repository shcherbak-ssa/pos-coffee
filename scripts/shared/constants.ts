import path from 'path';

export const EMPTY_STRING: string = '';

export const DAYS: number = 28;
export const DAY_MILLISECONDS: number = 86400000;

export const AVATART_GENERATOR_URL: string = 'https://i.pravatar.cc/300?img=';
export const SERVER_CONFIG_FILENAME: string
  = path.resolve(__dirname, '..', '..', 'server', 'src', 'main', 'resources', 'poscoffee', 'poscoffee.config.json');

export enum UserType {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  WAITER = 'WAITER',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  MISC = 'MISC',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
}

export const paymentMethods: PaymentMethod[] = [
  PaymentMethod.CASH,
  PaymentMethod.CARD,
  PaymentMethod.MISC,
];
