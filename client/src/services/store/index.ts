import type { Entity, JoinedStore, Page as BasePage, StoreService as BaseStoreService } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { ProgerError } from 'shared/errors';
import { filterById, findById, replaceById } from 'shared/utils/by-id';
import { getUpdates } from 'shared/helpers/get-updates';
import { Page } from 'lib/page-model';

export class StoreService<S, E extends Entity, D> implements BaseStoreService<E> {

  private constructor(
    private entityName: EntityName,
    private store: JoinedStore<S, E, D>,
    private createDraft: (entity?: E) => D,
    private createEntitySchema: (entity?: E) => E,
  ) {}

  public static create<S, E extends Entity, D>(
    entityName: EntityName,
    store: JoinedStore<S, E, D>,
    createDraft: (entity?: E) => D,
    createEntitySchema: (entity?: E) => E,
  ): StoreService<S, E, D> {
    return new StoreService(
      entityName,
      store,
      createDraft,
      createEntitySchema,
    );
  }

  public add(entities: E[]): void {
    this.store.state.list = entities.map(this.createEntitySchema);
  }

  public setPage(page: BasePage<E>): void {
    this.store.state.page = Page.create(page);
    this.add(this.store.state.page.entities);
  }

  public updatePage(page: Partial<BasePage<E>>): void {
    this.store.state.page = Page.create({
      ...this.store.state.page,
      ...page,
    });
  }

  public save(entity: E): void {
    const foundEntity: E | undefined = findById(this.store.state.list, entity.id);
    let updatedEntities: E[] = this.store.state.list;

    if (foundEntity) {
      updatedEntities = replaceById(this.store.state.list, entity);
    } else {
      updatedEntities.push(entity);
    }

    this.store.add(updatedEntities);
  }

  public remove(entityId: number): void {
    const updatedEntities: E[] = filterById(this.store.state.list, entityId);
    this.store.add(updatedEntities);

    this.updateSelected({
      ...this.store.state.selected,
      isArchived: !this.store.state.selected.isArchived,
    });
  }

  public setSelected(entityId: number): void {
    const entity: E | undefined = entityId === ZERO
      ? this.createEntitySchema()
      : findById(this.store.state.list, entityId);

    if (entity) {
      this.updateSelected(entity);
      return;
    }

    throw new ProgerError(`${this.entityName} not found in the store`);
  }

  public getSelectedUpdates(): Partial<E> | undefined {
    const { selected, list } = this.store.state;
    const foundEntity: E | undefined = findById(list, selected.id);

    if (foundEntity) {
      return getUpdates(foundEntity, selected) as Partial<E>;
    }
  }

  public updateSelected(entity: E): void {
    this.store.state.selected = this.createEntitySchema(entity);
    this.store.draft = this.createDraft(this.store.state.selected);
  }

}
