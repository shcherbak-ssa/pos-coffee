import type { BaseSchema as Schema } from 'shared/types';
import { ZERO } from 'shared/constants';

export class BaseSchema<U> implements Schema {
  public id: number;
  public isArchived: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public archivedAt: Date | null;

  protected constructor(schema?: Schema) {
    this.id = schema?.id || ZERO;
    this.isArchived = schema?.isArchived || false;
    this.createdAt = schema?.createdAt ? new Date(schema.createdAt) : null;
    this.updatedAt = schema?.updatedAt ? new Date(schema.updatedAt) : null;
    this.archivedAt = schema?.archivedAt ? new Date(schema.archivedAt) : null;
  }

  public getUpdates(): U {
    const { id, createdAt, updatedAt, archivedAt, ...updates } = this;

    return updates as U;
  }
}
