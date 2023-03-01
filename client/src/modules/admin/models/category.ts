import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { EMPTY_STRING, ZERO } from 'shared/constants';

import type { CategoryDraft, CategoryUpdates } from '@admin/shared/types';

export class CategorySchema implements BaseCategorySchema {
  public id: number;
  public name: string;
  public productsCount: number;
  public isAvailable: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;

  private constructor(schema?: BaseCategorySchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.productsCount = schema?.productsCount || ZERO;
    this.isAvailable = schema?.isAvailable || false;
    this.createdAt = schema?.createdAt ? new Date(schema.createdAt) : null;
    this.updatedAt = schema?.updatedAt ? new Date(schema.updatedAt) : null;
  }

  public static create(schema?: BaseCategorySchema): CategorySchema {
    return new CategorySchema(schema);
  }

  public getUpdates(): CategoryUpdates {
    const { id, createdAt, updatedAt, ...updates } = this;

    return updates;
  }
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
