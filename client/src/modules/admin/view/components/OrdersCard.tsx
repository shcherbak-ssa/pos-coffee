import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

import type { OrderSchema } from 'shared/types';
import { InputWrapper } from 'view/components/InputWrapper';

import { CardWrapper } from '@admin/view/components/CardWrapper';
import { CardHeading } from '@admin/view/components/CardHeading';

export type Props = {
  order: OrderSchema;
}

export function OrdersCard({ order }: Props) {

  return (
    <CardWrapper>
      <CardHeading heading="Order" />

      <div className="grid grid-cols-1 gap-10">
        <InputWrapper label="Number">
          <InputText
            id="number"
            type="text"
            disabled={true}
            value={order.number}
          />
        </InputWrapper>

        <InputWrapper label="User">
          <InputText
            id="user"
            type="text"
            disabled={true}
            value={`${order.user.name} ${order.user.surname}`}
          />
        </InputWrapper>

        <InputWrapper label="Total">
          <InputNumber
            id="total"
            mode="currency"
            currency="EUR"
            disabled={true}
            value={order.total}
          />
        </InputWrapper>

        <InputWrapper label="Created">
          <InputText
            id="created"
            type="text"
            disabled={true}
            value={order.createdAt?.toLocaleDateString()}
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  );

}
