import classnames from 'classnames';

import { EMPTY_STRING } from 'shared/constants';

export type Props = {
  icon: string;
  spin?: boolean,
  className?: string;
}

export function SimpleIcon({ icon, spin = false, className = EMPTY_STRING }: Props) {

  return (
    <i className={classnames(className, icon , { 'pi-spin': spin })} />
  );

}
