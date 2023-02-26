import type { ProductCategory, ProductSchema as BaseProductSchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';
import { BaseSchema } from 'lib/base-schema';

import type { ProductDraft, ProductsFilter, ProductUpdates } from '@admin/shared/types';

export class ProductSchema extends BaseSchema<ProductUpdates> implements BaseProductSchema {
  public sku: string;
  public name: string;
  public price: number;
  public stock: number;
  public stockPerTime: number;
  public image: string;
  public category: ProductCategory;
  public useStockForVariants: boolean;
  public isAvailable: boolean;

  private constructor(schema?: BaseProductSchema) {
    super(schema);
    this.sku = schema?.sku || EMPTY_STRING;
    this.name = schema?.name || EMPTY_STRING;
    this.price = schema?.price || ZERO;
    this.stock = schema?.stock || ZERO;
    this.stockPerTime = schema?.stockPerTime || ZERO;
    this.useStockForVariants = schema?.useStockForVariants || false;
    this.image = schema?.image || EMPTY_STRING;
    this.category = schema?.category ? { ...schema.category } : { id: ZERO, name: EMPTY_STRING };
    this.isAvailable = schema?.isAvailable || false;
  }

  public static create(schema?: BaseProductSchema): ProductSchema {
    return new ProductSchema(schema);
  }
}

export function createFilter({ isArchived: onlyArchived = false }: ProductsFilter): ProductsFilter {
  return {
    isArchived: onlyArchived,
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

    set stock(stock: number) {
      schema.stock = stock;
    },

    set stockPerTime(stockPerTime: number) {
      schema.stockPerTime = stockPerTime;
    },

    set useStockForVariants(useStockForVariants: boolean) {
      schema.useStockForVariants = useStockForVariants;
    },

    set image(photo: string) {
      schema.image = photo;
    },

    set category(category: ProductCategory) {
      schema.category = { ...category };
    },

    set isAvailable(isAvailable: boolean) {
      schema.isAvailable = isAvailable;
    },
  };

}
