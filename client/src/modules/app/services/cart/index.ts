import type { OrderLineSchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type {
  CartPayload,
  CartService as BaseCartService,
  CartStockAlertMessage,
  CartStore,
} from '@app/shared/types';

export class CartService implements BaseCartService {

  private constructor(
    private store: CartStore,
  ) {}

  public static create(store: CartStore): CartService {
    return new CartService(store);
  }

  public isSameOrderLine(line: OrderLineSchema, lineToCompare: OrderLineSchema): boolean {
    return line.productId === lineToCompare.productId
      ? line.variantId === lineToCompare.variantId
      : false;
  }

  public getStockAlertMessage({ product, variant }: CartPayload): CartStockAlertMessage | undefined {
    const { id: searchProductId } = product;
    const searchVariantId: number = variant?.id || ZERO;

    for (const [ [ productId, variantId ], alertMessage ] of this.store.state.orderLineStockAlerts.entries()) {
      if (productId === searchProductId && variantId === searchVariantId) {
        return alertMessage;
      }
    }
  }

  public checkStock({ product, variant }: CartPayload): CartStockAlertMessage | undefined {
    throw new Error('Method not implemented.');
  }

}
