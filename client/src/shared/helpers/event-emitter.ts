import type { EmptyFunction } from 'shared/types';

import type { ViewEvent } from '@admin/shared/constants';

export type Handler = EmptyFunction<Promise<void>>;

export class EventEmitter {

  private static instance: EventEmitter;
  private handlers: Map<ViewEvent, Handler>;

  private constructor() {
    this.handlers = new Map([]);
  }

  public static get(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }

    return EventEmitter.instance;
  }

  public on(event: ViewEvent, handler: Handler): void {
    this.handlers.set(event, handler);
  }

  public remove(event: ViewEvent): void {
    this.handlers.delete(event);
  }

  public async emit(event: ViewEvent): Promise<void> {
    const handler: Handler | undefined = this.handlers.get(event);

    if (handler) {
      await handler();
    }
  }

}
