import { useEffect } from 'react';

import type { SettingsSchema } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useError } from 'view/hooks/error';
import { useController } from 'view/hooks/controller';

import type { AppController, AppStore } from '@admin/shared/types';
import { ControllerName, StoreName } from '@admin/shared/constants';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';
import { SettingsPaymentsCard } from '@admin/view/components/SettingsPaymentsCard';
import { SettingsGeneralCard } from '@admin/view/components/SettingsGeneralCard';

export function SettingsPageContainer() {

  const { state: { isEditMode, settingsUpdates }, settingsDraft } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const [ validationError, cleanValidationError ] = useError<SettingsSchema>(ErrorType.VALIDATION);

  useEffect(() => {
    appController.loadSettings();
  }, []);

  useEffect(() => {
    cleanValidationError();
  }, [isEditMode]);

  return (
    <InfoPageWrapper className="grid-cols-2">
      <SettingsGeneralCard
        entity={settingsUpdates}
        entityDraft={settingsDraft}
        isEditMode={isEditMode}
        validationError={validationError}
      />

      <SettingsPaymentsCard
        entity={settingsUpdates}
        entityDraft={settingsDraft}
        isEditMode={isEditMode}
        validationError={validationError}
      />
    </InfoPageWrapper>
  );

}
