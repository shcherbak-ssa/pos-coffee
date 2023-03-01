import classnames from 'classnames';

import { APP_NAME, EMPTY_STRING } from 'shared/constants';
import logo from 'view/assets/poscoffee-logo.svg';

export type Props = {
  className?: string;
  type?: 'block' | 'inline';
  size?: 'normal' | 'large';
  onDark?: boolean;
}

export function AppLogo({
  className = EMPTY_STRING,
  size = 'normal',
  type = 'inline',
  onDark = false,
}: Props) {

  return (
    <div className={classnames('app-logo select-none', className, {
      'flex items-center gap-2': type === 'inline',
    })}>
      <img
        className={classnames({
          'mx-auto': type === 'block',
          'normal': size === 'normal',
          'large': size === 'large',
          'bg-white rounded-full': onDark,
        })}
        src={logo}
        alt={APP_NAME}
      />

      <div
        className={classnames('app-name', {
          'mt-2': type === 'block',
          'text-2xl': size === 'normal',
          'text-3xl': size === 'large',
        })}
      >
        { APP_NAME }
      </div>
    </div>
  );

}
