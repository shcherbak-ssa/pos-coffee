import { proxy } from 'valtio';

import type { ProductVariantSchema as BaseProductVariantSchema, StoreService as BaseStoreService } from 'shared/types';
import { EntityName } from 'shared/constants';
import { StoreService } from 'services/store';

import type {
  ProductVariantDraft,
  ProductVariantsState,
  ProductVariantsStore,
  ProductVariantsStoreActions,
  ProductVariantUpdates,
} from '@admin/shared/types';
import { createDraft, ProductVariantSchema } from '@admin/models/product-variant';

export const productVariantsStore: ProductVariantsStore & ProductVariantsStoreActions = {

  state: proxy({
    list: [],
    selected: ProductVariantSchema.create(),
  }),

  draft: createDraft(),

  /**
   * CrudStore implementation
   */

  add(variants: BaseProductVariantSchema[]): void {
    createStoreService().add(variants);
    productVariantsStore.state.list = variants.map(ProductVariantSchema.create);
  },

  save(variant: BaseProductVariantSchema): void {
    createStoreService().save(variant);
  },

  remove(variantId: number): void {
    createStoreService().remove(variantId);
  },

  selected: {

    set(variantId: number): void {
      createStoreService().setSelected(variantId);
    },

    hadUpdates(): boolean {
      const { id, ...updates } = this.getUpdates();

      return !!Object.keys(updates).length;
    },

    getUpdates(): ProductVariantUpdates {
      const updates: ProductVariantUpdates | undefined = createStoreService().getSelectedUpdates();

      return updates || (productVariantsStore.state.selected as ProductVariantSchema).getUpdates();
    },

  },

};

function createStoreService(): BaseStoreService<BaseProductVariantSchema> {
  return StoreService.create<ProductVariantsState, BaseProductVariantSchema, ProductVariantDraft>(
    EntityName.PRODUCT_VARIANT,
    productVariantsStore,
    (variant?: BaseProductVariantSchema) => createDraft(variant),
    (variant?: BaseProductVariantSchema) => ProductVariantSchema.create(variant),
  );
}
