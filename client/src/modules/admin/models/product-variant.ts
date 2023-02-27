import type { ProductVariantSchema as BaseProductVariantSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

import type { ProductVariantDraft, ProductVariantUpdates } from '@admin/shared/types';

export class ProductVariantSchema implements BaseProductVariantSchema {
  public id: number;
  public sku: string;
  public name: string;
  public price: number | null;
  public stock: number | null;
  public stockPerTime: number | null;
  public stockAlert: number | null;

  private constructor(schema?: BaseProductVariantSchema) {
    this.id = schema?.id || ZERO;
    this.sku = schema?.sku || EMPTY_STRING;
    this.name = schema?.name || EMPTY_STRING;
    this.price = typeof(schema?.price) === 'number' ? schema.price : null;
    this.stock = typeof(schema?.stock) === 'number' ? schema.stock : null;
    this.stockPerTime = typeof(schema?.stockPerTime) === 'number' ? schema.stockPerTime : null;
    this.stockAlert = typeof(schema?.stockAlert) === 'number' ? schema.stockAlert : null;
  }

  public static create(schema?: BaseProductVariantSchema): ProductVariantSchema {
    return new ProductVariantSchema(schema);
  }

  public isNewSchema(): boolean {
    return this.id === ZERO;
  }

  public getUpdates(): ProductVariantUpdates {
    const { id, ...updates } = this;

    return updates;
  }
}

export function createDraft(schema: BaseProductVariantSchema = ProductVariantSchema.create()): ProductVariantDraft {

  return {
    set sku(sku: string) {
      schema.sku = sku;
    },

    set name(name: string) {
      schema.name = name;
    },

    set price(price: number | null) {
      schema.price = price;
    },

    set stock(stock: number | null) {
      schema.stock = stock;
    },

    set stockPerTime(stockPerTime: number | null) {
      schema.stockPerTime = stockPerTime;
    },

    set stockAlert(stockAlert: number | null) {
      schema.stockAlert = stockAlert;
    },
  };

}
