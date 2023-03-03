import type { MouseEvent } from 'react';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';

import type { EmptyFunction } from 'shared/types';
import { CardHeading } from 'view/components/CardHeading';

export type Props = {
  heading: string;
  click: EmptyFunction;
}

export function SearchResultsHeading({ heading, click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click();
  }

  return (
    <div className="flex items-center gap-2 mb-6">
      <CardHeading className="mb-0" heading={heading} />

      <Button
        className="p-button-sm p-button-text b-button-rounded"
        icon={PrimeIcons.LINK}
        onClick={handleClick}
      />
    </div>
  );

}
