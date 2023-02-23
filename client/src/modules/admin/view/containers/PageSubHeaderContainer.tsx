import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';

import { SimpleIcon } from 'view/components/SimpleIcon';

import type { PageComponentProps } from '@admin/shared/types';
import { ControlGroup } from '@admin/shared/constants';
import { listActionOptions, listViewOptions } from '@admin/shared/configs/view';
import { PageSubHeaderOption } from '@admin/view/components/PageSubHeaderOption';

export type Props = PageComponentProps & {
  groups: ControlGroup[];
};

export function PageSubHeaderContainer({ appStore, appController, groups }: Props) {

  function selectListView(event: SelectButtonChangeEvent): void {
    if (event.value !== null) {
      appController.updateViewState('listView', event.value);
    }
  }

  function selectListAction(event: SelectButtonChangeEvent): void {
    appController.updateViewState('listAction', event.value);
  }

  function drawActions(): React.ReactNode {
    if (groups.includes(ControlGroup.ACTIONS)) {
      return (
        <SelectButton
          value={appStore.state.view.listAction}
          options={listActionOptions}
          itemTemplate={PageSubHeaderOption}
          onChange={selectListAction}
          multiple
        />
      );
    }
  }

  function drawViews(): React.ReactNode {
    if (groups.includes(ControlGroup.VIEWS)) {
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
  }

  return (
    <div className="border-b-2 px-6 py-4 flex items-center justify-between">
      { drawActions() }

      { drawViews() }
    </div>
  );

}
