import { type SelectButtonChangeEvent, SelectButton } from "primereact/selectbutton";

import { useStore } from "view/hooks/store";
import { useController } from "view/hooks/controller";

import type { AppStore, AppController } from "@admin/shared/types";
import { StoreName, ControllerName } from "@admin/shared/constants";
import { listActionOptions } from "@admin/shared/configs/view";
import { PageSubHeaderOption } from "@admin/view/components/PageSubHeaderOption";

export function PageSubHeaderActionsContainer() {

  const { state: { view } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function selectListAction(event: SelectButtonChangeEvent): void {
    appController.updateViewState('listAction', event.value);
  }

  return (
    <SelectButton
      value={view.listAction}
      options={listActionOptions}
      itemTemplate={PageSubHeaderOption}
      onChange={selectListAction}
      multiple
    />
  );

}
