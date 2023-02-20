import { Tag  } from 'primereact/tag';

import type { ViewSeverity } from 'shared/types'

export type Props = {
  isAvailable: boolean;
  isArchived: boolean;
}

export function AvailableLabel({ isAvailable, isArchived }: Props) {

  function getValue(): string {
    if (isArchived) {
      return 'archived';
    }

    return isAvailable ? 'Yes' : 'No';
  }

  function getSeverity(): ViewSeverity {
    if (isArchived) {
      return;
    }

    return isAvailable ? 'success' : 'danger';
  }

  return (
    <Tag
      value={getValue().toUpperCase()}
      severity={getSeverity()}
    />
  );

}
