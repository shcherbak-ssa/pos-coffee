import type { Entity, JoinedStore, StoreService as BaseStoreService } from 'shared/types';
import { filterById, findById, replaceById } from 'shared/utils/by-id';
import { getUpdates } from 'shared/helpers/get-updates';

export class StoreService<T, E extends Entity, D> implements BaseStoreService<T, E, D> {

  private constructor() {}

  public static create<T, E extends Entity, D>(): StoreService<T, E, D> {
    return new StoreService();
  }

  public save(store: JoinedStore<T, E, D>, entity: E): void {
    const foundEntity: E | undefined = findById(store.state.list, entity.id);
    let updatedEntities: E[] = store.state.list;

    if (foundEntity) {
      updatedEntities = replaceById(store.state.list, entity);
    } else {
      updatedEntities.push(entity);
    }

    store.add(updatedEntities);
  }

  public remove(store: JoinedStore<T, E, D>, entityId: number): void {
    const updatedEntities: E[] = filterById(store.state.list, entityId);
    store.add(updatedEntities);
  }

  public getSelectedUpdates(store: JoinedStore<T, E, D>): Partial<E> | undefined {
    const { selected, list } = store.state;
    const foundEntity: E | undefined = findById(list, selected.id);

    if (foundEntity) {
      return getUpdates(foundEntity, selected) as Partial<E>;
    }
  }

}
