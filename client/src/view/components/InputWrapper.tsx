import classnames from 'classnames';

import { EMPTY_STRING } from 'shared/constants';

export type Props = {
  label: string;
  children: React.ReactElement;
  description?: string;
  errorMessage?: string;
  className?: string;
}

export function InputWrapper({ label, errorMessage, description, children, className }: Props) {

  const { props: childrenProps } = children;

  return (
    <div
      className={classnames('p-float-label flex flex-col w-full', className, {
        'p-invalid': !!errorMessage,
      })}
    >
      { children }

      {
        errorMessage
          ? <small className="p-invalid mt-1 px-2">{ errorMessage }</small>
          : EMPTY_STRING
      }

      {
        description && !errorMessage
          ? <small className="mt-1 px-2">{ description }</small>
          : EMPTY_STRING
      }

      <label htmlFor={ childrenProps.id || childrenProps.inputId }>
        { label }
      </label>
    </div>
  );

}
