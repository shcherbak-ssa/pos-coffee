import type { LoaderService as BaseLoaderService, Store, ValidationSchema } from 'shared/types';
import { ProgerError } from 'shared/errors';

import type { Controllers } from '@admin/shared/types';
import { ControllerName, StoreName, ValidationName } from '@admin/shared/constants';

export class LoaderService implements BaseLoaderService {

  private constructor() {}

  public static create(): LoaderService {
    return new LoaderService();
  }

  public async loadController(name: ControllerName): Promise<Controllers> {
    switch (name) {
      case ControllerName.APP: {
        const { AppController } = await import('@admin/controllers/app');

        return AppController.create();
      }
      case ControllerName.USERS: {
        const { UsersController } = await import('@admin/controllers/users');

        return UsersController.create();
      }
      case ControllerName.PRODUCTS: {
        const { ProductsController } = await import('@admin/controllers/products');

        return ProductsController.create();
      }
      case ControllerName.CATEGORIES: {
        const { CategoriesController } = await import('@admin/controllers/categories');

        return CategoriesController.create();
      }
      case ControllerName.PRODUCT_VARIANTS: {
        const { ProductVariantsController } = await import('@admin/controllers/product-variants');

        return ProductVariantsController.create();
      }
      case ControllerName.ORDERS: {
        const { OrdersController } = await import('@admin/controllers/orders');

        return OrdersController.create();
      }
    }

    throw new ProgerError(`[LOADER] Controller ${name} does not exist`);
  }

  public async loadStore(name: StoreName): Promise<Store> {
    switch (name) {
      case StoreName.APP: {
        const { appStore } = await import('@admin/services/store/app');

        return appStore;
      }
      case StoreName.USERS: {
        const { usersStore } = await import('@admin/services/store/users');

        return usersStore;
      }
      case StoreName.PRODUCTS: {
        const { productsStore } = await import('@admin/services/store/products');

        return productsStore;
      }
      case StoreName.CATEGORIES: {
        const { categoriesStore } = await import('@admin/services/store/categories');

        return categoriesStore;
      }
      case StoreName.PRODUCT_VARIANTS: {
        const { productVariantsStore } = await import('@admin/services/store/product-variants');

        return productVariantsStore;
      }
      case StoreName.ORDERS: {
        const { ordersStore } = await import('@admin/services/store/orders');

        return ordersStore;
      }
    }

    throw new ProgerError(`[LOADER] Store ${name} does not exist`);
  }

  public async loadValidationSchema<T>(name: ValidationName): Promise<ValidationSchema<T>> {
    switch (name) {
      case ValidationName.USERS: {
        const { schema } = await import('@admin/services/validation/users-schema');

        return schema as ValidationSchema<T>;
      }
      case ValidationName.PRODUCTS: {
        const { schema } = await import('@admin/services/validation/products-schema');

        return schema as ValidationSchema<T>;
      }
      case ValidationName.CATEGORIES: {
        const { schema } = await import('@admin/services/validation/categories-schema');

        return schema as ValidationSchema<T>;
      }
      case ValidationName.PRODUCT_VARIANTS: {
        const { schema } = await import('@admin/services/validation/product-variant-schema');

        return schema as ValidationSchema<T>;
      }
    }

    throw new ProgerError(`[LOADER] Validation ${name} does not exist`);
  }

}
