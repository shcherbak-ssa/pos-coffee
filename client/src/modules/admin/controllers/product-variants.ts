import type { ApiService, NotificationService, ProductVariantSchema as BaseProductVariantSchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { notifications } from 'shared/configs/notifications';
import { CrudController } from 'lib/crud-controller';

import type {
  ProductVariantsController as BaseProductVariantsController,
  ProductVariantsStoreActions,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';

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

  public async save(productId: number): Promise<boolean> {
    return await this.tryToSave({
      endpoint: ApiEndpoint.PRODUCT_VARIANTS,
      validationName: ValidationName.PRODUCT_VARIANTS,
      query: { productId },
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

}
