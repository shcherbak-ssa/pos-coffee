import classnames from 'classnames';

import type { ErrorObjectHook } from 'view/hooks/error';

export type Props<T> = {
  label: string;
  children: React.ReactElement;
  valueKey?: keyof T;
  validationError?: ErrorObjectHook<T>;
  description?: string;
  className?: string;
}

export function InputWrapper<T>({ label, description, children, className, validationError, valueKey }: Props<T>) {

  const { props: childrenProps } = children;

  const inputComponent: typeof children = {
    ...children,
    props: {
      ...children.props,
      className: classnames(children.props.className, {
        'p-invalid': isError(),
      }),
    },
  };

  function getErrorMessage(): string | undefined {
    if (validationError) {
      return validationError.errors[valueKey];
    }
  }

  function isError(): boolean {
    return !!getErrorMessage();
  }

  function renderErrorMessage(): React.ReactNode {
    const errorMessage: string | undefined = getErrorMessage();

    if (errorMessage) {
      return <small className="p-invalid mt-1 px-2">{ errorMessage }</small>;
    }
  }

  function renderDescription(): React.ReactNode {
    const errorMessage: string | undefined = getErrorMessage();

    if (description && !errorMessage) {
      return <small className="mt-1 px-2">{ description }</small>;
    }
  }

  return (
    <div
      className={classnames('p-float-label flex flex-col w-full', className, {
        'p-invalid': isError(),
      })}
    >
      { inputComponent }

      { renderErrorMessage() }

      { renderDescription() }

      <label htmlFor={ childrenProps.id || childrenProps.inputId }>
        { label }
      </label>
    </div>
  );

}
