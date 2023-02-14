import classnames from 'classnames';

import { EMPTY_STRING } from 'shared/constants';

export type Props = {
  icon: string;
  className?: string;
}

export function SimpleIcon({ icon, className = EMPTY_STRING }: Props) {

  return (
    <i className={classnames(className, icon)} />
  );

}
