import type { Page as BasePage } from 'shared/types';
import { DEFAULT_PAGE_SIZE, ZERO } from 'shared/constants';

export class Page<T> implements BasePage<T> {
  public entities: T[];
  public page: number;
  public size: number;
  public total: number;
  public totalPages: number;

  private constructor(page?: BasePage<T>) {
    this.entities = page?.entities ? [ ...page.entities ] : [];
    this.page = page?.page || ZERO;
    this.size = page?.size || DEFAULT_PAGE_SIZE;
    this.total = page?.total || ZERO;
    this.totalPages = page?.totalPages || ZERO;
  }

  public static create<T>(page?: BasePage<T>): Page<T> {
    return new Page(page);
  }
}
