import type { SettingsSchema as BaseSettingsSchema } from 'shared/types';
import { Currency, ZERO } from 'shared/constants';

export class SettingsSchema implements BaseSettingsSchema {
  public id: number;
  public currency: Currency;
  public taxes: number;

  private constructor(schema?: BaseSettingsSchema) {
    this.id = schema?.id || ZERO;
    this.currency = schema?.currency || Currency.EUR;
    this.taxes = schema?.taxes || ZERO;
  }

  public static create(schema?: BaseSettingsSchema): SettingsSchema {
    return new SettingsSchema(schema);
  }
}
