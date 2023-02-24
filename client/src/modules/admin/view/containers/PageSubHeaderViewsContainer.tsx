import { type SelectButtonChangeEvent, SelectButton } from "primereact/selectbutton";

import { useStore } from "view/hooks/store";
import { useController } from "view/hooks/controller";
import { SimpleIcon } from "view/components/SimpleIcon";

import type { AppStore, AppController } from "@admin/shared/types";
import { StoreName, ControllerName } from "@admin/shared/constants";
import { listViewOptions } from "@admin/shared/configs/view";

export function PageSubHeaderViewsContainer() {

  const appStore = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function selectListView(event: SelectButtonChangeEvent): void {
    if (event.value !== null) {
      appController.updateViewState('listView', event.value);
    }
  }

  return (
    <SelectButton
      value={appStore.state.view.listView}
      optionLabel="value"
      options={listViewOptions}
      itemTemplate={SimpleIcon}
      onChange={selectListView}
    />
  );

}
