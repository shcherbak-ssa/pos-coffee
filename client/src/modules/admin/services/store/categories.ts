import { proxy } from 'valtio';

import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { findById } from 'shared/utils/by-id';
import { StoreService } from 'services/store';

import type { CategoriesStore, CategoriesStoreActions, CategoryUpdates } from '@admin/shared/types';
import { createDraft, CategorySchema } from '@admin/models/category';

export const categoriesStore: CategoriesStore & CategoriesStoreActions = {

  state: proxy({
    list: [],
    selected: CategorySchema.create(),
  }),

  draft: createDraft(),

  /**
   * CrudStore implementation
   */

  add(products: BaseCategorySchema[]): void {
    categoriesStore.state.list = products.map(CategorySchema.create);
  },

  save(product: BaseCategorySchema): void {
    StoreService.create().save(categoriesStore, product);
  },

  remove(productId: number): void {
    StoreService.create().remove(categoriesStore, productId);

    updateSelectedProduct({
      ...categoriesStore.state.selected,
      isArchived: !categoriesStore.state.selected.isArchived,
    });
  },

  selected: {

    set(productId: number): void {
      const product: BaseCategorySchema | undefined = productId === ZERO
        ? CategorySchema.create()
        : findById(categoriesStore.state.list, productId);

      if (product) {
        updateSelectedProduct(product);
        return;
      }

      throw new AppError(`Product with id ${productId} not found`);
    },

    hadUpdates(): boolean {
      const { id, createdAt, updatedAt, archivedAt, ...updates } = this.getUpdates();

      return !!Object.keys(updates).length;
    },

    getUpdates(): CategoryUpdates {
      const updates: CategoryUpdates | undefined = StoreService.create().getSelectedUpdates(categoriesStore);

      return updates || (categoriesStore.state.selected as CategorySchema).getUpdates();
    },

  },

};

function updateSelectedProduct(user: BaseCategorySchema): void {
  categoriesStore.state.selected = CategorySchema.create(user);
  categoriesStore.draft = createDraft(categoriesStore.state.selected);
}
