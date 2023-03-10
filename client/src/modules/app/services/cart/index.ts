import { ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';

import type {
  CartOrderLineSchema as BaseCartOrderLineSchema,
  CartOrderSchema,
  CartOrderUpdates,
  CartPayload,
  CartService as BaseCartService,
  CartStore,
  UserSchema,
} from '@app/shared/types';
import { CartOrderLineSchema } from '@app/models/cart';

export class CartService implements BaseCartService {

  private constructor(
    private store: CartStore,
  ) {}

  public static create(store: CartStore): CartService {
    return new CartService(store);
  }

  public remainStock({ product, variant }: CartPayload): number {
    const stock: number = typeof(variant?.stock) === 'number' ? variant.stock : product.stock;
    const stockPerTime: number
      = typeof(variant?.stockPerTime) === 'number' ? variant.stockPerTime : product.stockPerTime;

    const line: BaseCartOrderLineSchema = CartOrderLineSchema.create(product, variant);
    const foundLine: BaseCartOrderLineSchema | undefined = this.findLine(line);
    const count: number = foundLine?.count || ZERO;

    return Math.floor(stock - count * stockPerTime);
  }

  public findLine(line: BaseCartOrderLineSchema): BaseCartOrderLineSchema | undefined {
    return this.store.state.order.lines.find((orderLine) => this.isSameOrderLine(orderLine, line));
  }

  public isSameOrderLine(line: BaseCartOrderLineSchema, lineToCompare: BaseCartOrderLineSchema): boolean {
    return line.product.id === lineToCompare.product.id
      ? line.variant?.id === lineToCompare.variant?.id
      : false;
  }

  public checkStock({ product, variant }: BaseCartOrderLineSchema, count: number): void {
    const stock: number = typeof(variant?.stock) === 'number' ? variant.stock : product.stock;
    const stockPerTime: number
      = typeof(variant?.stockPerTime) === 'number' ? variant.stockPerTime : product.stockPerTime;

    const useStock: number = count * stockPerTime;

    if (useStock > stock) {
      throw new AppError('Add product', 'Not enough stock!');
    }
  }

  public parseOrder(order: CartOrderSchema, user: UserSchema, taxes: number): CartOrderUpdates {
    return {
      taxes,
      user: { id: user.id },
      lines: order.lines.map(({ count, price, product, variant }) => ({
        count,
        price,
        productId: product.id,
        variantId: variant?.id,
      })),
      paymentMethod: order.paymentMethod,
    };
  }

}
