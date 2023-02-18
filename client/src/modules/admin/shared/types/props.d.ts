import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';

import type { AppController, AppViewState } from './app';

export type AppComponentProps = {
  isAppMenuOpen: boolean;
  appController: AppController;
}

export type PageComponentProps = {
  view: AppViewState;
  appController: AppController;
}

export type EntityViewComponentProps<T> = {
  entities: T[];
  selectEntity: (entity: T) => void;
  isSelectEnable: boolean;
  selectedEntities: T[];
  setSelectedEntities: (entities: T[]) => void;
  actionsMenuItemsProps: ActionsMenuItemsProps;
}
