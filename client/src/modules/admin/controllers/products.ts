import type { Entity, ProductSchema as BaseProductSchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'lib/crud-controller';

import type { ProductsController as BaseProductsController, ProductsFilter } from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { createFilter, ProductSchema } from '@admin/models/product';

export class ProductsController extends CrudController implements BaseProductsController {

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
      filter: createFilter(filter || {}),
    });
  }

  public async save(product: BaseProductSchema): Promise<number | undefined> {
    const copiedProduct: ProductSchema = ProductSchema.create(product);

    return await this.tryToSave({
      endpoint: ApiEndpoint.PRODUCTS,
      entity: copiedProduct as BaseProductSchema as Entity,
      isEntityNew: copiedProduct.isNewSchema(),
      validationName: ValidationName.PRODUCTS,
    });
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
  }

}
