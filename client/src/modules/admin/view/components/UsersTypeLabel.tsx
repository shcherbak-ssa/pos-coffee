import { Badge } from 'primereact/badge';

import type { ViewSeverity } from 'shared/types';
import { UserType } from 'shared/constants';

export type Props = {
  type: UserType;
}

export function UsersTypeLabel({ type }: Props) {

  function getSeverity(): ViewSeverity {
    switch (type) {
      case UserType.ADMIN:
        return 'warning';
      case UserType.MANAGER:
        return undefined;
      case UserType.WAITER:
        return 'success';
    }
  }

  return <Badge value={type} severity={getSeverity()} />;

}
