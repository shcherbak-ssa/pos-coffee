import type { ProductVariantSchema } from 'shared/types';
import { ZERO } from 'shared/constants';

import type {
  CartOrderSchema as BaseCartOrderSchema,
  CartOrderLineSchema as BaseCartOrderLineSchema,
  CartProductSchema,
} from '@app/shared/types';
import { PRODUCT_COUNT_STEP } from '@app/shared/constants';

export class CartOrderSchema implements BaseCartOrderSchema {
  public lines: BaseCartOrderLineSchema[];
  public userId: number;

  private constructor() {
    this.lines = [];
    this.userId = ZERO;
  }

  public static create(): CartOrderSchema {
    return new CartOrderSchema();
  }
}

export class CartOrderLineSchema implements BaseCartOrderLineSchema {
  public count: number;
  public price: number;
  public product: CartProductSchema;
  public variant?: ProductVariantSchema;

  private constructor(product: CartProductSchema, variant?: ProductVariantSchema) {
    this.count = PRODUCT_COUNT_STEP;
    this.price = CartOrderLineSchema.getPrice(product, variant);
    this.product = product;
    this.variant = variant;
  }

  public static create(product: CartProductSchema, variant?: ProductVariantSchema): CartOrderLineSchema {
    return new CartOrderLineSchema(product, variant);
  }

  private static getPrice(product: CartProductSchema, variant?: ProductVariantSchema): number {
    return typeof(variant?.price) === 'number'
      ? variant.price
      : product.price;
  }
}
