import type { ProductSchema as BaseProductSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';
import { BaseSchema } from 'lib/base-schema';

import type { ProductDraft, ProductsFilter, ProductUpdates } from '@admin/shared/types';

export class ProductSchema extends BaseSchema<ProductUpdates> implements BaseProductSchema {
  public sku: string;
  public name: string;
  public price: number;
  public image: string;

  private constructor(schema?: BaseProductSchema) {
    super(schema);
    this.sku = schema?.sku || EMPTY_STRING;
    this.name = schema?.name || EMPTY_STRING;
    this.price = schema?.price || ZERO;
    this.image = schema?.image || EMPTY_STRING;
  }

  public static create(schema?: BaseProductSchema): ProductSchema {
    return new ProductSchema(schema);
  }
}

export function createFilter({ onlyArchived = false }: ProductsFilter): ProductsFilter {
  return {
    onlyArchived,
  };
}

export function createDraft(schema: BaseProductSchema = ProductSchema.create()): ProductDraft {

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

    set image(photo: string) {
      schema.image = photo;
    },
  };

}
