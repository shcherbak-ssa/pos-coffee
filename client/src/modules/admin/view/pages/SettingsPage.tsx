import { PrimeIcons } from 'primereact/api';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { loadContext } from 'view/helpers/load-context';

import type { AppController, AppStore } from '@admin/shared/types';
import { ControllerName, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { SettingsPageContainer } from '@admin/view/containers/SettingsPageContainer';

const SettingsPage = loadContext(Page, {
  stores: [],
  controllers: [],
});

export default SettingsPage;

function Page() {

  const { state: { isEditMode } } = useStore(StoreName.APP) as AppStore;
  const appController = useController(ControllerName.APP) as AppController;

  const pageLayoutProps: Omit<PageLayoutProps, 'children'> = {
    page: pages[PageTitle.SETTINGS],
    showSubHeader: false,
    showTabs: false,
    buttonProps: {
      label: isEditMode ? 'Save' : 'Edit',
      icon: isEditMode ? PrimeIcons.SAVE : PrimeIcons.PENCIL,
      command: () => {
        if (isEditMode) {
          appController.updateSettings()
            .then((success) => {
              if (success) {
                appController.setIsEditMode(false);
              }
            });
        } else {
          appController.setIsEditMode(true);
        }
      },
    },
  };

  return (
    <PageLayout {...pageLayoutProps}>
      <SettingsPageContainer />
    </PageLayout>
  );

}
