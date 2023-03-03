import { Currency, PRICE_WHOLE_DECIMAL_SPLITTER, ZERO } from 'shared/constants';
import { currencySymbols } from 'shared/configs/currency';

export type Props = {
  price: number;
  currency: Currency;
  useSymbol?: boolean;
}

export function BasePrice({ price, currency, useSymbol = false }: Props) {

  function parsePrice(): string {
    const zeroString: string = ZERO.toString();
    let [ whole, decimal ] = price.toString().split(PRICE_WHOLE_DECIMAL_SPLITTER);

    if (!decimal) {
      decimal = (zeroString + zeroString);
    }

    if (decimal.length === 1) {
      decimal += zeroString;
    }

    return `${whole}.${decimal} ${useSymbol ? currencySymbols[currency] : currency}`;
  }

  return (
    <div className="shrink-0">
      { parsePrice() }
    </div>
  );

}
