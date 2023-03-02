import type { PageUpdates, ProductSchema as BaseProductSchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'lib/crud-controller';

import type { ProductsController as BaseProductsController, ProductsFilter } from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { updateSelectedEntityTitle } from '@admin/shared/helpers/selected-entity-title';

export class ProductsController extends CrudController<BaseProductSchema> implements BaseProductsController {

  public static create(): ProductsController {
    return new ProductsController(StoreName.PRODUCTS, EntityName.PRODUCT);
  }

  public async loadById(productId: number): Promise<boolean> {
    return await this.tryToLoadById({
      endpoint: ApiEndpoint.PRODUCTS_ID,
      entityId: productId,
    });
  }

  public async loadAll(filter?: ProductsFilter): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.PRODUCTS,
      filter: { ...filter },
    });
  }

  public async save(): Promise<boolean> {
    const success: boolean = await this.tryToSave({
      endpoint: ApiEndpoint.PRODUCTS,
      validationName: ValidationName.PRODUCTS,
    });

    if (success) {
      this.updateSelectedEntityTitle();
    }

    return success;
  }

  public async archive(productId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.PRODUCTS_ARCHIVE,
      entityId: productId,
      action: 'archive',
    });
  }

  public async restore(productId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.PRODUCTS_RESTORE,
      entityId: productId,
      action: 'restore',
    });
  }

  public async select(productId: number = ZERO): Promise<void> {
    await this.tryToSelect(productId);

    this.updateSelectedEntityTitle();
  }

  public async updatePage(page: PageUpdates<BaseProductSchema>): Promise<void> {
    await this.tryToUpdatePage(page);
  }

  private updateSelectedEntityTitle(): void {
    updateSelectedEntityTitle<BaseProductSchema>(
      StoreName.PRODUCTS,
      (product: BaseProductSchema) => product.name,
    );
  }

}
