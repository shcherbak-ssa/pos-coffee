import type { ProductSchema, ProductVariantSchema as BaseProductVariantSchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'lib/crud-controller';

import type {
  ProductVariantsController as BaseProductVariantsController,
  ProductVariantsStoreActions,
  ProductVariantUpdates,
} from '@admin/shared/types';
import {
  ApiEndpoint,
  PARAM_NULL_LABELS,
  PARAM_NULL_LABELS_SAPARATOR,
  StoreName,
  ValidationName,
} from '@admin/shared/constants';

export class ProductVariantsController
  extends CrudController<BaseProductVariantSchema> implements BaseProductVariantsController {

  public static create(): ProductVariantsController {
    return new ProductVariantsController(StoreName.PRODUCT_VARIANTS, EntityName.PRODUCT_VARIANT);
  }

  public async loadAll(productId: number): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.PRODUCT_VARIANTS,
      filter: { productId },
    });
  }

  public async save(product: ProductSchema): Promise<boolean> {
    const store = await this.getStore() as ProductVariantsStoreActions;
    const selectedVariant: BaseProductVariantSchema = { ...store.selected.get() };

    if (selectedVariant.stock === null) {
      selectedVariant.stock = product.stock;
    }

    return await this.tryToSave({
      endpoint: ApiEndpoint.PRODUCT_VARIANTS,
      validationName: ValidationName.PRODUCT_VARIANTS,
      entity: selectedVariant,
      query: {
        productId: product.id,
        [PARAM_NULL_LABELS]: this.getNullLabels(store.selected.getUpdates()),
      },
    });
  }

  public async delete(variantId: number): Promise<boolean> {
    return await this.tryToDelete({
      endpoint: ApiEndpoint.PRODUCT_VARIANTS_ID,
      entityId: variantId,
    });
  }

  public async select(variantId: number = ZERO): Promise<void> {
    await this.tryToSelect(variantId);
  }

  private getNullLabels({ price, stock, stockAlert, stockPerTime }: ProductVariantUpdates): string {
    const labels: { [key: string]: number | null | undefined } = { price, stock, stockAlert, stockPerTime };
    const nullLabels: string[] = [];

    for (const [ key, value ] of Object.entries(labels)) {
      if (value !== undefined) {
        nullLabels.push(key);
      }
    }

    return nullLabels.join(PARAM_NULL_LABELS_SAPARATOR);
  }

}
