import { SimpleIcon } from 'view/components/SimpleIcon';

import type { OptionItem } from '@admin/shared/types';

export function PageSubHeaderOption({ icon, label }: OptionItem) {

  return (
    <div className="flex items-center gap-2">
      <SimpleIcon icon={icon} />
      <span>{ label }</span>
    </div>
  );

}
