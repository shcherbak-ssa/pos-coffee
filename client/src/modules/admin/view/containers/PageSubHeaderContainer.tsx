import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { SimpleIcon } from 'view/components/SimpleIcon';

import type { AppController, AppStore } from '@admin/shared/types';
import { StoreName, ControllerName } from '@admin/shared/constants';
import { listActionOptions, listViewOptions } from '@admin/shared/configs';
import { PageSubHeaderOption } from '@admin/view/components/PageSubHeaderOption';

export function PageSubHeaderContainer() {

  const { state: { view } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  function selectListView(event: SelectButtonChangeEvent): void {
    if (event.value !== null) {
      appController.updateViewState('listView', event.value);
    }
  }

  function selectListAction(event: SelectButtonChangeEvent): void {
    appController.updateViewState('listAction', event.value);
  }

  return (
    <div className="border-b-2 px-6 py-4 flex items-center justify-between">
      <SelectButton
        value={view.listAction}
        options={listActionOptions}
        itemTemplate={PageSubHeaderOption}
        onChange={selectListAction}
        multiple
      />

      <SelectButton
        value={view.listView}
        optionLabel="value"
        options={listViewOptions}
        itemTemplate={SimpleIcon}
        onChange={selectListView}
      />
    </div>
  );

}
