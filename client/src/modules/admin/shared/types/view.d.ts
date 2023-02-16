import type { ListView, ListAction, ListTab } from '@admin/shared/constants';

export type ViewState = {
  listView: ListView;
  listAction: ListAction[];
  listTab: ListTab;
}
