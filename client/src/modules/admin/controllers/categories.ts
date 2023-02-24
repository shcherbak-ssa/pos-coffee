import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { ProgerError } from 'shared/errors';
import { CrudController } from 'lib/crud-controller';

import type { CategoriesController as BaseCategoriesController, CategoriesFilter, CategoriesStoreActions } from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { createFilter } from '@admin/models/category';

export class CategoriesController extends CrudController<BaseCategorySchema> implements BaseCategoriesController {

  public static create(): CategoriesController {
    return new CategoriesController(StoreName.CATEGORIES, EntityName.CATEGORY);
  }

  public async setIsPopupOpen(isPopupOpen: boolean): Promise<void> {
    const store = await this.getStore() as CategoriesStoreActions;
    store.setIsPopupOpen(isPopupOpen);
  }

  public async loadById(): Promise<boolean> {
    throw new ProgerError('This method cannot be called');
  }

  public async loadAll(filter?: CategoriesFilter): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.CATEGORIES,
      filter: createFilter(filter || {}),
    });
  }

  public async save(): Promise<boolean> {
    return await this.tryToSave({
      endpoint: ApiEndpoint.CATEGORIES,
      validationName: ValidationName.CATEGORIES,
    });
  }

  public async archive(categoryId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.CATEGORIES_ARCHIVE,
      entityId: categoryId,
      action: 'restore',
    });
  }

  public async restore(categoryId: number): Promise<boolean> {
    return await this.tryToChangeArchiveState({
      endpoint: ApiEndpoint.CATEGORIES_RESTORE,
      entityId: categoryId,
      action: 'restore',
    });
  }

  public async select(categoryId: number = ZERO): Promise<void> {
    await this.tryToSelect(categoryId);
  }

}
