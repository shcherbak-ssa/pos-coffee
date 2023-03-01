import { InputNumber } from 'primereact/inputnumber';

import type { SettingsSchema } from 'shared/types';
import { CardHeading } from 'view/components/CardHeading';
import { InputWrapper } from 'view/components/InputWrapper';

import type { CardWithInputsProps, SettingsDraft } from '@admin/shared/types';
import { CardWrapper } from '@admin/view/components/CardWrapper';

export type Props = CardWithInputsProps<SettingsSchema, SettingsDraft>;

export function SettingsPaymentsCard({
  entity: settings,
  entityDraft: settingsDraft,
  validationError,
  isEditMode,
}: Props) {

  return (
    <CardWrapper>
      <CardHeading heading="Payments" />

      <div className="grid grid-cols-1 gap-y-10">
        <InputWrapper
          label="Taxes"
          valueKey="taxes"
          validationError={validationError}
        >
          <InputNumber
            id="taxes"
            disabled={!isEditMode}
            value={settings.taxes}
            onValueChange={(e) => settingsDraft.taxes = Number(e.value)}
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  )

}
