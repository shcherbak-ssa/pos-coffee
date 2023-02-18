import { proxy } from 'valtio';

import type { ProductSchema as BaseProductSchema } from 'shared/types';
import { ZERO } from 'shared/constants';
import { AppError } from 'shared/errors';
import { findById } from 'shared/utils/by-id';
import { StoreService } from 'services/store';

import type { ProductsStore, ProductsStoreActions, ProductUpdates } from '@admin/shared/types';
import { createDraft, ProductSchema } from '@admin/models/product';

export const productsStore: ProductsStore & ProductsStoreActions = {

  state: proxy({
    list: [],
    selected: ProductSchema.create(),
  }),

  draft: createDraft(),

  /**
   * CrudStore implementation
   */

  add(products: BaseProductSchema[]): void {
    productsStore.state.list = products.map(ProductSchema.create);
  },

  save(product: BaseProductSchema): void {
    StoreService.create().save(productsStore, product);
  },

  remove(productId: number): void {
    StoreService.create().remove(productsStore, productId);

    updateSelectedProduct({
      ...productsStore.state.selected,
      isArchived: !productsStore.state.selected.isArchived,
    });
  },

  selected: {

    set(productId: number): void {
      const product: BaseProductSchema | undefined = productId === ZERO
        ? ProductSchema.create()
        : findById(productsStore.state.list, productId);

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

    getUpdates(): ProductUpdates {
      const updates: ProductUpdates | undefined = StoreService.create().getSelectedUpdates(productsStore);

      return updates || (productsStore.state.selected as ProductSchema).getUpdates();
    },

  },

};

function updateSelectedProduct(user: BaseProductSchema): void {
  productsStore.state.selected = ProductSchema.create(user);
  productsStore.draft = createDraft(productsStore.state.selected);
}
