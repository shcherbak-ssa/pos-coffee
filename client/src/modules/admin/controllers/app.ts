import type {
  ApiService,
  NotificationService,
  ProductCategory,
  SettingsSchema,
  UserSchema,
  ValidationService,
} from 'shared/types';
import { EntityName } from 'shared/constants';
import { BaseController } from 'lib/base-controller';

import type {
  AppController as BaseAppController,
  AppPageSchema,
  Statistics,
  AppStore,
  AppStoreActions,
  AppViewState,
  SettingsUpdates,
  SearchResults,
} from '@admin/shared/types';
import { ApiEndpoint, StoreName, ValidationName } from '@admin/shared/constants';

export class AppController extends BaseController implements BaseAppController {

  public static create(): AppController {
    return new AppController(StoreName.APP, EntityName.ANY);
  }

  public async loadSettings(): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const settings: SettingsSchema = await apiService.get(ApiEndpoint.APP_SETTINGS);

      const appStore = await this.getStore() as AppStoreActions;
      appStore.setSettings(settings);
    } catch (e: any) {
      this.parseError(e);
    }
  }

  public async updateSettings(): Promise<boolean> {
    try {
      const store = await this.getStore() as (AppStore & AppStoreActions);

      if (!store.hasSettingsUpdates()) {
        return true;
      }

      const notificationService: NotificationService = await this.getNotificationService();

      notificationService.addNotification({
        type: 'process',
        severity: 'info',
        heading: 'Updating...',
        message: `Settings is being updated`,
      });

      const settingsToUpdate: SettingsSchema = store.state.settingsUpdates;

      const validationService: ValidationService = await this.getValidationService();
      await validationService.validateToUpdate(ValidationName.SETTINGS, settingsToUpdate);

      const updates: SettingsUpdates = store.getSettingsUpdates();

      const apiService: ApiService = await this.getApiService();
      apiService.addBody(updates).put(ApiEndpoint.APP_SETTINGS);

      store.setSettings(settingsToUpdate);

      notificationService.addNotification({
        severity: 'success',
        heading: 'Updated',
        message: `Settings updated successfully`,
      });

      return true;
    } catch (e: any) {
      await this.parseError(e);
      return false;
    }
  }

  public async loadProductCategories(): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const productCategories: ProductCategory[] = await apiService.get(ApiEndpoint.APP_PRODUCT_CATEGORIES);

      const store = await this.getStore() as AppStoreActions;
      store.setProductCategories(productCategories);
    } catch (e: any) {
      this.parseError(e);
    }
  }

  public async loadStatistics(): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const statistics: Statistics = await apiService.get(ApiEndpoint.APP_STATISTICS);

      const store = await this.getStore() as AppStoreActions;
      store.setStatistics(statistics);
    } catch (e: any) {
      this.parseError(e);
    }
  }

  public async search(searchString: string): Promise<void> {
    try {
      const apiService: ApiService = await this.getApiService();
      const searchResult: SearchResults = await apiService
        .addQuery({ searchString })
        .get(ApiEndpoint.APP_SEARCH);

      const store = await this.getStore() as AppStoreActions;
      store.setSearchResults(searchResult);
    } catch (e: any) {
      this.parseError(e);
    }
  }

  public async resetSearch(): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setSearchResults(null);
  }

  public async getCurrentUser(): Promise<UserSchema> {
    const store = await this.getStore() as AppStore;
    return store.state.currentUser;
  }

  public async setCurrentPage(page: AppPageSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setCurrentPage(page);
  }

  public async setCurrentUser(user: UserSchema): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setCurrentUser(user);
  }

  public async setSelectedEntityTitle(title: string): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setSelectedEntityTitle(title);
  }

  public async setIsAppMenuOpen(isOpen: boolean): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setIsAppMenuOpen(isOpen);
  }

  public async setIsEditMode(isEditMode: boolean): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.setIsEditMode(isEditMode);
  }

  public async updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): Promise<void> {
    const store = await this.getStore() as AppStoreActions;
    store.updateViewState(state, value);
  }

}
