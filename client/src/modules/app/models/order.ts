import type { OrderLineSchema as BaseOrderLineSchema, ProductVariantSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

import type { CartOrderSchema as BaseCartOrderSchema, CartProductSchema } from '@app/shared/types';
import { PRODUCT_COUNT_STEP } from '@app/shared/constants';

export class CartOrderSchema implements BaseCartOrderSchema {
  public lines: BaseOrderLineSchema[];
  public userId: number;

  private constructor() {
    this.lines = [];
    this.userId = ZERO;
  }

  public static create(): CartOrderSchema {
    return new CartOrderSchema();
  }
}

export class OrderLineSchema implements BaseOrderLineSchema {
  public id: number;
  public count: number;
  public price: number;
  public productId: number;
  public variantId: number;
  public productName: string;
  public variantName: string;
  public image: string;

  private constructor(product: CartProductSchema, variant?: ProductVariantSchema) {
    this.id = ZERO;
    this.count = PRODUCT_COUNT_STEP;
    this.price = OrderLineSchema.getPrice(product, variant);
    this.productId = product.id;
    this.variantId = variant?.id || ZERO;
    this.productName = product.name;
    this.variantName = variant?.name || EMPTY_STRING;
    this.image = product.image;
  }

  public static create(product: CartProductSchema, variant?: ProductVariantSchema): OrderLineSchema {
    return new OrderLineSchema(product, variant);
  }

  private static getPrice(product: CartProductSchema, variant?: ProductVariantSchema): number {
    if (variant && !variant.useProductPrice) {
      return variant.price;
    }

    return product.price;
  }
}
