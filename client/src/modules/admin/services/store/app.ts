import { proxy } from 'valtio';

import type { ProductCategory, SettingsSchema as BaseSettingsSchema } from 'shared/types';
import { EMPTY_STRING } from 'shared/constants';
import { getUpdates } from 'shared/helpers/get-updates';
import { SettingsSchema } from 'lib/settings-model';

import type {
  AppPageSchema,
  AppState,
  AppStore,
  AppStoreActions,
  AppViewState,
  SettingsUpdates,
} from '@admin/shared/types';
import { ListView, ListTab } from '@admin/shared/constants';
import { UserSchema } from '@admin/models/user';
import { createDraft } from '@admin/models/settings';

export const appStore: AppStore & AppStoreActions = {

  state: proxy<AppState>({
    settings: SettingsSchema.create(),
    settingsUpdates: SettingsSchema.create(),
    productCategories: [],
    currentPage: { title: EMPTY_STRING },
    currentUser: UserSchema.create(),
    selectedEntityTitle: EMPTY_STRING,
    isAppMenuOpen: false,
    isEditMode: false,

    view: {
      listView: ListView.TABLE,
      listTab: ListTab.ACTIVE,
      listAction: [],
    },
  }),

  settingsDraft: createDraft(),

  setSettings(settings: BaseSettingsSchema): void {
    appStore.state.settings = SettingsSchema.create(settings);
    appStore.state.settingsUpdates = SettingsSchema.create(settings);
    appStore.settingsDraft = createDraft(appStore.state.settingsUpdates);
  },

  hasSettingsUpdates(): boolean {
    const { id, ...updates } = this.getSettingsUpdates();

    return !!Object.keys(updates).length;
  },

  getSettingsUpdates(): SettingsUpdates {
    const { settings, settingsUpdates } = appStore.state;

    return getUpdates(settings, settingsUpdates);
  },

  setProductCategories(productCategories: ProductCategory[]): void {
    appStore.state.productCategories = [...productCategories];
  },

  setCurrentPage(page: AppPageSchema): void {
    appStore.state.currentPage = page;
  },

  setCurrentUser(user: UserSchema): void {
    appStore.state.currentUser = UserSchema.create(user);
  },

  setSelectedEntityTitle(title: string): void {
    appStore.state.selectedEntityTitle = title;
  },

  setIsAppMenuOpen(isOpen: boolean): void {
    appStore.state.isAppMenuOpen = isOpen;
  },

  setIsEditMode(isEditMode: boolean): void {
    appStore.state.isEditMode = isEditMode;
  },

  updateViewState<T extends keyof AppViewState>(state: T, value: AppViewState[T]): void {
    appStore.state.view[state] = value;
  },

};
