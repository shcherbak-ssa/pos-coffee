import { proxy } from 'valtio';

import type {
  ProductVariantSchema as BaseProductVariantSchema,
  StoreService as BaseStoreService,
  Page as BasePage,
  PageUpdates,
} from 'shared/types';
import { EntityName } from 'shared/constants';
import { StoreService } from 'services/store';
import { Page } from 'lib/page-model';

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
    page: Page.create<BaseProductVariantSchema>(),
  }),

  draft: createDraft(),

  add(variants: BaseProductVariantSchema[]): void {
    createStoreService().add(variants);
  },

  setPage(page: BasePage<BaseProductVariantSchema>): void {},

  updatePage(page: PageUpdates<BaseProductVariantSchema>): void {},

  save(variant: BaseProductVariantSchema): void {
    createStoreService().save(variant);
  },

  remove(variantId: number): void {
    createStoreService().remove(variantId);
  },

  selected: {

    get(): BaseProductVariantSchema {
      return productVariantsStore.state.selected;
    },

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
