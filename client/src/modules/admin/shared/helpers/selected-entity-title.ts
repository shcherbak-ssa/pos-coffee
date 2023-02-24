import type { StoreCrud } from 'shared/types';
import { Context } from 'shared/context';

import type { AppController } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';

export function updateSelectedEntityTitle<T>(storeName: StoreName, getTitle: (entity: T) => string): void {
  const store = Context.getStore(storeName) as StoreCrud<T>;
  const selected: T = store.selected.get();

  const appController = Context.getController(ControllerName.APP) as AppController;
  appController.setSelectedEntityTitle(getTitle(selected));
}
