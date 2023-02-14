import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';

export function SettingsPage() {

  const settingsPage: AppPageSchema = pages[PageTitle.SETTINGS];

  return (
    <PageLayout page={settingsPage}>
      <div>@TODO: implement SETTINGS</div>
    </PageLayout>
  );

}
