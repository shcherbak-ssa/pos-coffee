import { proxy } from 'valtio';

import type {
  ProductSchema as BaseProductSchema,
  StoreService as BaseStoreService,
  Page as BasePage,
  PageUpdates,
} from 'shared/types';
import { EntityName } from 'shared/constants';
import { StoreService } from 'services/store';
import { Page } from 'lib/page-model';

import type {
  ProductDraft,
  ProductsState,
  ProductsStore,
  ProductsStoreActions,
  ProductUpdates,
} from '@admin/shared/types';
import { createDraft, ProductSchema } from '@admin/models/product';

export const productsStore: ProductsStore & ProductsStoreActions = {

  state: proxy({
    list: [],
    selected: ProductSchema.create(),
    page: Page.create<BaseProductSchema>(),
  }),

  draft: createDraft(),

  add(products: BaseProductSchema[]): void {
    createStoreService().add(products);
  },

  setPage(page: BasePage<BaseProductSchema>): void {
    createStoreService().setPage(page);
  },

  updatePage(page: PageUpdates<BaseProductSchema>): void {
    createStoreService().updatePage(page);
  },

  save(product: BaseProductSchema): void {
    createStoreService().save(product);
  },

  remove(productId: number): void {
    createStoreService().remove(productId);
  },

  selected: {

    get(): BaseProductSchema {
      return productsStore.state.selected;
    },

    set(productId: number): void {
      createStoreService().setSelected(productId);
    },

    hadUpdates(): boolean {
      const { id, createdAt, updatedAt, archivedAt, ...updates } = this.getUpdates();

      return !!Object.keys(updates).length;
    },

    getUpdates(): ProductUpdates {
      const updates: ProductUpdates | undefined = createStoreService().getSelectedUpdates();

      return updates || (productsStore.state.selected as ProductSchema).getUpdates();
    },

  },

};

function createStoreService(): BaseStoreService<BaseProductSchema> {
  return StoreService.create<ProductsState, BaseProductSchema, ProductDraft>(
    EntityName.PRODUCT,
    productsStore,
    (product?: BaseProductSchema) => createDraft(product),
    (product?: BaseProductSchema) => ProductSchema.create(product),
  );
}
