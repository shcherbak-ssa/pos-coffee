import type {
  ApiService,
  Entity,
  NotificationService,
  ProductVariantSchema as BaseProductVariantSchema,
} from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { notifications } from 'shared/configs/notifications';
import { CrudController } from 'lib/crud-controller';

import type {
  ProductVariantsController as BaseProductVariantsController,
  ProductVariantsStoreActions,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { ProductVariantSchema } from '@admin/models/product-variant';

export class ProductVariantsController extends CrudController implements BaseProductVariantsController {

  public static create(): ProductVariantsController {
    return new ProductVariantsController(StoreName.PRODUCT_VARIANTS, EntityName.PRODUCT_VARIANT);
  }

  public async loadAll(productId: number): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.PRODUCT_VARIANTS,
      filter: { productId },
    });
  }

  public async save(productId: number, variant: BaseProductVariantSchema): Promise<number | undefined> {
    const copiedVariant: ProductVariantSchema = ProductVariantSchema.create(variant);

    return await this.tryToSave({
      endpoint: ApiEndpoint.PRODUCT_VARIANTS,
      entity: copiedVariant as BaseProductVariantSchema as Entity,
      isEntityNew: copiedVariant.isNewSchema(),
      validationName: ValidationName.PRODUCT_VARIANTS,
      query: { productId },
    });
  }

  public async delete(variantId: number): Promise<boolean> {
    try {
      const notificationService: NotificationService = await this.getNotificationService();
      notificationService.addNotification(notifications.deleteProcess(EntityName.PRODUCT_VARIANT));

      const apiService: ApiService = await this.getApiService();
      await apiService
        .addParams({ id: variantId })
        .delete(ApiEndpoint.PRODUCT_VARIANTS_ID);

      const store = await this.getStore() as ProductVariantsStoreActions;
      store.remove(variantId);

      notificationService.addNotification(notifications.deleted(EntityName.PRODUCT_VARIANT));

      return true;
    } catch (e: any) {
      this.parseError(e);
      return false;
    }
  }

  public async select(variantId: number = ZERO): Promise<void> {
    await this.tryToSelect(variantId);
  }

}
