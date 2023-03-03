import { proxy } from 'valtio';

import type {
  OrderSchema as BaseOrderSchema,
  StoreService as BaseStoreService,
  Page as BasePage,
  PageUpdates,
} from 'shared/types';
import { EntityName } from 'shared/constants';
import { ProgerError } from 'shared/errors';
import { StoreService } from 'services/store';
import { OrderSchema } from 'lib/order-models';
import { Page } from 'lib/page-model';

import type { OrdersStore, OrdersStoreActions } from '@admin/shared/types';

export const ordersStore: OrdersStore & OrdersStoreActions = {

  state: proxy({
    list: [],
    selected: OrderSchema.create(),
    page: Page.create<BaseOrderSchema>(),
  }),

  draft: {},

  add(orders: BaseOrderSchema[]): void {
    createStoreService().add(orders);
  },

  setPage(page: BasePage<BaseOrderSchema>): void {
    createStoreService().setPage(page);
  },

  updatePage(page: PageUpdates<BaseOrderSchema>): void {
    createStoreService().updatePage(page);
  },

  save(order: BaseOrderSchema): void {
    createStoreService().save(order);
  },

  remove(): void {
    throw new ProgerError('This method cannot be called');
  },

  selected: {

    get(): BaseOrderSchema {
      return ordersStore.state.selected;
    },

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
