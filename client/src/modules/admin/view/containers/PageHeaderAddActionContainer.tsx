import type { MouseEvent } from 'react';
import { type NavigateFunction, useNavigate } from 'react-router';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { PagePath } from '@admin/shared/constants';

export type Props = {
  label: string;
  to: PagePath;
}

export function PageHeaderAddActionContainer({ label, to }: Props) {

  const navigate: NavigateFunction = useNavigate();

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    navigate(to);
  }

  return (
    <Button
      className="p-button-sm"
      icon={PrimeIcons.PLUS}
      label={label}
      onClick={handleClick}
    />
  );

}
