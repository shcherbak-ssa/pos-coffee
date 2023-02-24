import type { OrderSchema as BaseOrderSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { ProgerError } from 'shared/errors';
import { CrudController } from 'lib/crud-controller';

import type { OrdersController as BaseOrdersController } from '@admin/shared/types';
import { ApiEndpoint, StoreName } from '@admin/shared/constants';
import { updateSelectedEntityTitle } from '@admin/shared/helpers/selected-entity-title';

export class OrdersController extends CrudController<BaseOrderSchema> implements BaseOrdersController {

  public static create(): OrdersController {
    return new OrdersController(StoreName.ORDERS, EntityName.ORDER);
  }

  public async loadById(orderId: number): Promise<boolean> {
    return await this.tryToLoadById({
      endpoint: ApiEndpoint.ORDERS_ID,
      entityId: orderId,
    });
  }

  public async loadAll(): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.ORDERS,
      filter: {},
    });
  }

  public async select(orderId: number): Promise<void> {
    await this.tryToSelect(orderId);

    this.updateSelectedEntityTitle();
  }

  public async save(): Promise<boolean> {
    throw new ProgerError('This method cannot be called');
  }

  public async archive(orderId: number): Promise<boolean> {
    throw new ProgerError('This method cannot be called');
  }

  public async restore(orderId: number): Promise<boolean> {
    throw new ProgerError('This method cannot be called');
  }

  private updateSelectedEntityTitle(): void {
    updateSelectedEntityTitle<BaseOrderSchema>(
      StoreName.ORDERS,
      (order: BaseOrderSchema) => order.number,
    );
  }

}
