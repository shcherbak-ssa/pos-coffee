import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

import type { OrderSchema } from 'shared/types';
import type { Currency } from 'shared/constants';
import { InputWrapper } from 'view/components/InputWrapper';
import { CardHeading } from 'view/components/CardHeading';

import { CardWrapper } from '@admin/view/components/CardWrapper';

export type Props = {
  order: OrderSchema;
  currency: Currency;
}

export function OrdersCard({ order, currency }: Props) {

  return (
    <CardWrapper className="col-span-2">
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
            currency={currency}
            disabled={true}
            value={order.total}
          />
        </InputWrapper>

        <InputWrapper label="Payment method">
          <InputText
            id="paymentMethod"
            type="text"
            disabled={true}
            value={order.paymentMethod}
          />
        </InputWrapper>

        <InputWrapper label="Created">
          <InputText
            id="created"
            type="text"
            disabled={true}
            value={order.createdAt?.toLocaleString()}
          />
        </InputWrapper>
      </div>
    </CardWrapper>
  );

}
