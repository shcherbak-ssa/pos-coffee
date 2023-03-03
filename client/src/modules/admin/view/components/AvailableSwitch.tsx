import classnames from 'classnames';
import type { InputSwitchChangeEvent } from 'primereact/inputswitch';
import { PrimeIcons } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import type { EntityName } from 'shared/constants';
import { BaseSwitch } from 'view/components/BaseSwitch';
import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  entityName: EntityName;
  isEditMode: boolean;
  checked: boolean;
  change: (isAvailable: boolean) => void;
  className?: string;
}

export function AvailableSwitch({ entityName, className, isEditMode, checked, change }: Props) {

  function handleChange(e: InputSwitchChangeEvent) {
    e.preventDefault();

    change(e.value || false);
  }

  return (
    <div className={classnames('flex items-center gap-2', className)}>
      <BaseSwitch
        inputId="available"
        label="Available"
        disabled={!isEditMode}
        checked={checked}
        onChange={handleChange}
      />

      <div
        className="available-help-icon"
        data-pr-tooltip={`Define if the ${entityName.toLowerCase()} is available in the application`}
        data-pr-position="right"
        data-pr-at="right+5 center"
        data-pr-my="left center-2"
      >
        <SimpleIcon
          className="cursor-help"
          icon={PrimeIcons.QUESTION_CIRCLE}
        />
      </div>

      <Tooltip target=".available-help-icon" />
    </div>
  );

}
