import path from 'path';

export const EMPTY_STRING: string = '';

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
