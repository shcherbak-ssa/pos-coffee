import type { SelectItem } from 'primereact/selectitem';
import { Dropdown } from 'primereact/dropdown';

import type { SettingsSchema } from 'shared/types';
import { Currency } from 'shared/constants';
import { CardHeading } from 'view/components/CardHeading';
import { InputWrapper } from 'view/components/InputWrapper';

import type { CardWithInputsProps, SettingsDraft } from '@admin/shared/types';
import { CardWrapper } from 'view/components/CardWrapper';

export type Props = CardWithInputsProps<SettingsSchema, SettingsDraft>;

export function SettingsGeneralCard({
  entity: settings,
  entityDraft: settingsDraft,
  validationError,
  isEditMode,
}: Props) {

  function currencyOptions(): SelectItem[] {
    const currencies: Currency[] = [
      Currency.EUR,
      Currency.USD,
    ];

    return currencies.map((currency) => ({ label: currency }));
  }

  return (
    <CardWrapper>
      <CardHeading heading="General" />

      <div className="grid grid-cols-1 gap-y-10">
        <InputWrapper
          label="Currency"
          valueKey="currency"
          validationError={validationError}
        >
          <Dropdown
            inputId="currency"
            disabled={!isEditMode}
            value={{ label: settings.currency }}
            onChange={(e) => settingsDraft.currency = e.value.label}
            options={currencyOptions()}
            optionLabel="label"
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  )

}
