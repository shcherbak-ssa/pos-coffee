import classnames from 'classnames';

import { APP_NAME } from 'shared/constants';

import poscoffeeLogo from 'view/assets/icons/poscoffee-logo.svg';

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
        src={poscoffeeLogo}
        alt={APP_NAME}
      />

      <div className={nameClassnames}>
        { APP_NAME }
      </div>
    </div>
  );

}
