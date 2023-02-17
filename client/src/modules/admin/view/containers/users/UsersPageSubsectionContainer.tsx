import { SelectButton, type SelectButtonChangeEvent } from 'primereact/selectbutton';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { SimpleIcon } from 'view/components/SimpleIcon';

import type { UsersStore, UsersController } from '@admin/shared/types';
import { StoreName, ControllerName } from '@admin/shared/constants';
import { listActionOptions, listViewOptions } from '@admin/shared/configs';
import { PageSubSectionWrapper } from '@admin/view/components/page/PageSubSectionWrapper';
import { PageSubHeaderOption } from '@admin/view/components/PageSubHeaderOption';

export function UsersPageSubsectionContainer() {

  const { state: { view } } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;

  function selectListView(event: SelectButtonChangeEvent): void {
    if (event.value !== null) {
      usersController.updateViewState('listView', event.value);
    }
  }

  function selectListAction(event: SelectButtonChangeEvent): void {
    usersController.updateViewState('listAction', event.value);
  }

  return (
    <PageSubSectionWrapper>
      <div>
        <SelectButton
          value={view.listAction}
          options={listActionOptions}
          itemTemplate={PageSubHeaderOption}
          onChange={selectListAction}
          multiple
        />
      </div>

      <div>
        <SelectButton
          value={view.listView}
          optionLabel="value"
          options={listViewOptions}
          itemTemplate={SimpleIcon}
          onChange={selectListView}
        />
      </div>
    </PageSubSectionWrapper>
  );

}
