import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';
import { BaseSchema } from 'lib/base-schema';

import type { CategoriesFilter, CategoryDraft, CategoryUpdates } from '@admin/shared/types';

export class CategorySchema extends BaseSchema<CategoryUpdates> implements BaseCategorySchema {
  public name: string;
  public productsCount: number;
  public isAvailable: boolean;

  private constructor(schema?: BaseCategorySchema) {
    super(schema);
    this.name = schema?.name || EMPTY_STRING;
    this.productsCount = schema?.productsCount || ZERO;
    this.isAvailable = schema?.isAvailable || false;
  }

  public static create(schema?: BaseCategorySchema): CategorySchema {
    return new CategorySchema(schema);
  }
}

export function createFilter({ onlyArchived = false }: CategoriesFilter): CategoriesFilter {
  return {
    onlyArchived,
  };
}

export function createDraft(schema: BaseCategorySchema = CategorySchema.create()): CategoryDraft {

  return {
    set isAvailable(isAvailable: boolean) {
      schema.isAvailable = isAvailable;
    },

    set name(name: string) {
      schema.name = name;
    },
  };

}
