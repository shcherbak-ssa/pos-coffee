import { proxy } from 'valtio';

import type { CategorySchema as BaseCategorySchema, StoreService as BaseStoreService } from 'shared/types';
import { EntityName } from 'shared/constants';
import { StoreService } from 'services/store';

import type {
  CategoriesState,
  CategoriesStore,
  CategoriesStoreActions,
  CategoryDraft,
  CategoryUpdates,
} from '@admin/shared/types';
import { createDraft, CategorySchema } from '@admin/models/category';

export const categoriesStore: CategoriesStore & CategoriesStoreActions = {

  state: proxy({
    list: [],
    selected: CategorySchema.create(),
    isPopupOpen: false,
  }),

  draft: createDraft(),

  setIsPopupOpen(isPopupOpen: boolean): void {
    categoriesStore.state.isPopupOpen = isPopupOpen;
  },

  add(categories: BaseCategorySchema[]): void {
    createStoreService().add(categories)
  },

  save(category: BaseCategorySchema): void {
    createStoreService().save(category);
  },

  remove(categoryId: number): void {
    createStoreService().remove(categoryId);
  },

  selected: {

    get(): BaseCategorySchema {
      return categoriesStore.state.selected;
    },

    set(categoryId: number): void {
      createStoreService().setSelected(categoryId);
    },

    hadUpdates(): boolean {
      const { id, createdAt, updatedAt, archivedAt, ...updates } = this.getUpdates();

      return !!Object.keys(updates).length;
    },

    getUpdates(): CategoryUpdates {
      const updates: CategoryUpdates | undefined = createStoreService().getSelectedUpdates();

      return updates || (categoriesStore.state.selected as CategorySchema).getUpdates();
    },

  },

};

function createStoreService(): BaseStoreService<BaseCategorySchema> {
  return StoreService.create<CategoriesState, BaseCategorySchema, CategoryDraft>(
    EntityName.CATEGORY,
    categoriesStore,
    (category?: BaseCategorySchema) => createDraft(category),
    (category?: BaseCategorySchema) => CategorySchema.create(category),
  );
}
