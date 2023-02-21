import type { ProductVariantSchema as BaseProductVariantSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

import type { ProductVariantDraft, ProductVariantUpdates } from '@admin/shared/types';

export class ProductVariantSchema implements BaseProductVariantSchema {
  public id: number;
  public sku: string;
  public name: string;
  public price: number;
  public useProductPrice: boolean;

  private constructor(schema?: BaseProductVariantSchema) {
    this.id = schema?.id || ZERO;
    this.sku = schema?.sku || EMPTY_STRING;
    this.name = schema?.name || EMPTY_STRING;
    this.price = schema?.price || ZERO;
    this.useProductPrice = schema?.useProductPrice || false;
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

    set price(price: number) {
      schema.price = price;
    },

    set useProductPrice(useProductPrice: boolean) {
      schema.useProductPrice = useProductPrice;
    },
  };

}
