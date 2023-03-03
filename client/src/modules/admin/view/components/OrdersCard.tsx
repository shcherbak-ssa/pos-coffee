import type { MouseEvent } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import type { EmptyFunction, OrderSchema } from 'shared/types';
import type { Currency } from 'shared/constants';
import { InputWrapper } from 'view/components/InputWrapper';
import { CardHeading } from 'view/components/CardHeading';

import { CardWrapper } from 'view/components/CardWrapper';
import { PrimeIcons } from 'primereact/api';

export type Props = {
  order: OrderSchema;
  currency: Currency;
  toInfoPage: EmptyFunction;
}

export function OrdersCard({ order, currency, toInfoPage }: Props) {

  function handleUserClick(e: MouseEvent): void {
    e.preventDefault();

    toInfoPage();
  }

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

        <div className="p-inputgroup">
          <InputWrapper label="User">
            <InputText
              id="user"
              type="text"
              disabled={true}
              value={`${order.user.name} ${order.user.surname}`}
            />
          </InputWrapper>

          <Button
            className="p-button-sm"
            icon={PrimeIcons.LINK}
            onClick={handleUserClick}
          />
        </div>

        <InputWrapper label="Total">
          <InputNumber
            id="total"
            mode="currency"
            currency={currency}
            disabled={true}
            value={order.total}
          />
        </InputWrapper>

        <InputWrapper label="Taxes">
          <InputText
            id="taxes"
            type="text"
            disabled={true}
            value={`${order.taxes}.00 %`}
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
