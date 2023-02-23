import type { CategorySchema as BaseCategorySchema, Entity } from 'shared/types';
import { EntityName, ZERO } from 'shared/constants';
import { CrudController } from 'lib/crud-controller';

import type { CategoriesController as BaseCategoriesController, CategoriesFilter } from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';
import { CategorySchema, createFilter } from '@admin/models/category';

export class CategoriesController extends CrudController implements BaseCategoriesController {

  public static create(): CategoriesController {
    return new CategoriesController(StoreName.CATEGORIES, EntityName.CATEGORY);
  }

  public async loadById(categoryId: number): Promise<boolean> {
    return true;
  }

  public async loadAll(filter?: CategoriesFilter): Promise<boolean> {
    return await this.tryToLoadAll({
      endpoint: ApiEndpoint.CATEGORIES,
      filter: createFilter(filter || {}),
    });
  }

  public async save(category: BaseCategorySchema): Promise<number | undefined> {
    const copiedCategory: CategorySchema = CategorySchema.create(category);

    return await this.tryToSave({
      endpoint: ApiEndpoint.CATEGORIES,
      entity: copiedCategory as BaseCategorySchema as Entity,
      isEntityNew: copiedCategory.isNewSchema(),
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
