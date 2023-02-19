import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { BaseSchema } from 'lib/base-schema';

import type { CategoriesFilter, CategoryDraft, CategoryUpdates } from '@admin/shared/types';

export class CategorySchema extends BaseSchema<CategoryUpdates> implements BaseCategorySchema {
  public name: string;

  private constructor(schema?: BaseCategorySchema) {
    super(schema);
    this.name = schema?.name || EMPTY_STRING;
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
    set name(name: string) {
      schema.name = name;
    },
  };

}
