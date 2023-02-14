import type { OptionItem } from '@admin/shared/types';
import { SimpleIcon } from 'view/components/SimpleIcon';

export function ListActionTemplate({ icon, label }: OptionItem) {

  return (
    <div className="flex items-center gap-2">
      <SimpleIcon icon={icon} />
      <span>{ label }</span>
    </div>
  );

}
