import type { CategorySchema as BaseCategorySchema } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { ProgerError } from 'shared/errors';
import { CrudController } from 'lib/crud-controller';

import type {
  CategoriesController as BaseCategoriesController,
  CategoriesStoreActions,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';

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

  public async loadAll(): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.CATEGORIES,
      filter: {},
    });
  }

  public async save(): Promise<boolean> {
    return await this.tryToSave({
      endpoint: ApiEndpoint.CATEGORIES,
      validationName: ValidationName.CATEGORIES,
    });
  }

  public async delete(categoryId: number): Promise<boolean> {
    return await this.tryToDelete({
      endpoint: ApiEndpoint.CATEGORIES_ID,
      entityId: categoryId,
    });
  }

  public async archive(categoryId: number): Promise<boolean> {
    throw new ProgerError('This method cannot be called');
  }

  public async restore(categoryId: number): Promise<boolean> {
    throw new ProgerError('This method cannot be called');
  }

  public async select(categoryId: number = ZERO): Promise<void> {
    await this.tryToSelect(categoryId);
  }

}
