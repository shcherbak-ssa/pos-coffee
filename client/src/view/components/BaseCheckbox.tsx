import classnames from 'classnames';
import { Checkbox, type CheckboxProps } from 'primereact/checkbox';

export type Props = CheckboxProps & {
  label: string;
};

export function BaseCheckbox({
  className,
  inputId,
  checked,
  label,
  disabled,
  onChange,
}: Props) {

  return (
    <div className={classnames('flex items-center', className)}>
      <Checkbox
        inputId={inputId}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />

      <label htmlFor={inputId} className="ml-2">
        { label }
      </label>
    </div>
  );

}
