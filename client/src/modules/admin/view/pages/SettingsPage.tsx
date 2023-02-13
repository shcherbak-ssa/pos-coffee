import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageTitle } from 'modules/admin/shared/constants';
import { pages } from 'modules/admin/shared/configs';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';

export function SettingsPage() {

  const settingsPage: AppPageSchema = pages[PageTitle.SETTINGS];

  return (
    <PageLayout page={settingsPage}>
      <div>@TODO: implement SETTINGS</div>
    </PageLayout>
  );

}
