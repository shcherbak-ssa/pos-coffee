import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';

import { SimpleIcon } from 'view/components/SimpleIcon';

import type { PageComponentProps } from '@admin/shared/types';
import { listActionOptions, listViewOptions } from '@admin/shared/configs/view';
import { PageSubHeaderOption } from '@admin/view/components/PageSubHeaderOption';

export type Props = PageComponentProps;

export function PageSubHeaderContainer({ view, appController }: Props) {

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
