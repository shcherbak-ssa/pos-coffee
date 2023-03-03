import type { Currency } from 'shared/constants';
import { BasePrice } from 'view/components/BasePrice';

export type Props = {
  heading: string;
  price: number;
  currency: Currency;
}

export function CartOrderSum({ heading, price, currency }: Props) {

  return (
    <div className="flex items-center justify-between text-sm">
      <h3>{ heading }</h3>

      <strong>
        <BasePrice
          price={price}
          currency={currency}
          useSymbol
        />
      </strong>
    </div>
  );

}
