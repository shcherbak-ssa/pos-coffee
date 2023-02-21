import classnames from 'classnames';
import type { CheckboxChangeEvent } from 'primereact/checkbox';
import { PrimeIcons } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import type { EntityName } from 'shared/constants';
import { BaseCheckbox } from 'view/components/BaseCheckbox';
import { SimpleIcon } from 'view/components/SimpleIcon';

export type Props = {
  entityName: EntityName;
  isEditMode: boolean;
  checked: boolean;
  change: (isAvailable: boolean) => void;
  className?: string;
}

export function AvailableCheckbox({ entityName, className, isEditMode, checked, change }: Props) {

  function handleChange(e: CheckboxChangeEvent) {
    e.preventDefault();

    change(e.checked || false)
  }

  return (
    <div className={classnames('flex items-center gap-2', className)}>
      <BaseCheckbox
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
