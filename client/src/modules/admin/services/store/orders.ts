import { proxy } from 'valtio';

import type { OrderSchema as BaseOrderSchema, StoreService as BaseStoreService } from 'shared/types';
import { EntityName } from 'shared/constants';
import { ProgerError } from 'shared/errors';
import { StoreService } from 'services/store';
import { OrderSchema } from 'lib/order-models';

import type { OrdersStore, OrdersStoreActions } from '@admin/shared/types';

export const ordersStore: OrdersStore & OrdersStoreActions = {

  state: proxy({
    list: [],
    selected: OrderSchema.create(),
  }),

  draft: {},

  /**
   * CrudStore implementation
   */

  add(orders: BaseOrderSchema[]): void {
    createStoreService().add(orders);
  },

  save(order: BaseOrderSchema): void {
    createStoreService().save(order);
  },

  remove(): void {
    throw new ProgerError('This method cannot be called');
  },

  selected: {

    set(orderId: number): void {
      createStoreService().setSelected(orderId);
    },

    hadUpdates(): boolean {
      throw new ProgerError('This method cannot be called');
    },

    getUpdates(): {} {
      throw new ProgerError('This method cannot be called');
    },

  },

};

function createStoreService(): BaseStoreService<BaseOrderSchema> {
  return StoreService.create<{}, BaseOrderSchema, {}>(
    EntityName.PRODUCT_VARIANT,
    ordersStore,
    () => ({}),
    (order?: BaseOrderSchema) => OrderSchema.create(order),
  );
}

