import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import type { Props as ActionsProps } from '@admin/view/components/PageHeaderActions';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function SettingsPage() {

  const settingsPage: AppPageSchema = pages[PageTitle.SETTINGS];

  const actionsProps: ActionsProps = { isEntityPage: false };

  return (
    <PageLayout page={settingsPage} actionsProps={actionsProps}>
      <div>@TODO: implement SETTINGS</div>
    </PageLayout>
  );

}
