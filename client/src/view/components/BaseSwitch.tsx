import classnames from 'classnames';
import { InputSwitch, type InputSwitchProps } from 'primereact/inputswitch';

export type Props = InputSwitchProps & {
  label: string;
};

export function BaseSwitch({
  className,
  inputId,
  checked,
  label,
  disabled,
  onChange,
}: Props) {

  return (
    <div className={classnames('flex items-center', className)}>
      <InputSwitch
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
