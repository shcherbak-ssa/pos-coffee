import type { PaymentMethod } from 'shared/types';
import { SimpleIcon } from 'view/components/SimpleIcon';

export function CartPaymentMethod({ icon, label }: PaymentMethod) {

  return (
    <div className="flex-center full">
      <div className="flex items-center">
        <SimpleIcon icon={icon} />

        <div className="ml-1">{ label }</div>
      </div>
    </div>
  );

}
