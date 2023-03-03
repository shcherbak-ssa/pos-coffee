import type { SettingsSchema as BaseSettingsSchema } from 'shared/types';
import type { Currency } from 'shared/constants';
import { SettingsSchema } from 'lib/settings-model';

import type { SettingsDraft } from '@admin/shared/types';

export function createDraft(schema: BaseSettingsSchema = SettingsSchema.create()): SettingsDraft {

  return {
    set currency(currency: Currency) {
      schema.currency = currency;
    },

    set taxes(taxes: number) {
      schema.taxes = taxes;
    },
  };

}
