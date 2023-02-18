import type { ProductSchema as BaseProductSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

import type { ProductDraft, ProductsFilter, ProductUpdates } from '@admin/shared/types';

export class ProductSchema implements BaseProductSchema {
  public id: number;
  public sku: string;
  public name: string;
  public price: number;
  public photo: string;
  public isArchived: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public archivedAt: Date | null;

  private constructor(schema?: BaseProductSchema) {
    this.id = schema?.id || ZERO;
    this.sku = schema?.sku || EMPTY_STRING;
    this.name = schema?.name || EMPTY_STRING;
    this.price = schema?.price || ZERO;
    this.photo = schema?.photo || EMPTY_STRING;
    this.isArchived = schema?.isArchived || false;
    this.createdAt = schema?.createdAt ? new Date(schema.createdAt) : null;
    this.updatedAt = schema?.updatedAt ? new Date(schema.updatedAt) : null;
    this.archivedAt = schema?.archivedAt ? new Date(schema.archivedAt) : null;
  }

  public static create(schema?: BaseProductSchema): ProductSchema {
    return new ProductSchema(schema);
  }

  public isNewSchema(): boolean {
    return this.id === ZERO;
  }

  public getUpdates(): ProductUpdates {
    const { id, createdAt, updatedAt, archivedAt, ...updates } = this;

    return updates;
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

    set photo(photo: string) {
      schema.photo = photo;
    },
  };

}
