import classnames from 'classnames';

import logo from 'assets/poscoffee-logo.svg';
import { APP_NAME } from 'shared/constants';

export type Props = {
  type?: 'block' | 'inline';
  size?: 'normal' | 'large';
}

export function AppLogo({ size = 'normal', type = 'inline' }: Props) {

  const iconClassnames: string = classnames({
    'mx-auto': type === 'block',
    'large': size === 'large',
  });

  const nameClassnames: string = classnames('app-name', {
    'text-3xl mt-2': type === 'block',
  });

  return (
    <div className="app-logo">
      <img
        className={iconClassnames}
        src={logo}
        alt={APP_NAME}
      />

      <div className={nameClassnames}>
        { APP_NAME }
      </div>
    </div>
  );

}
