import type { ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { AppPageSchema } from '@admin/shared/types';
import { PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageContainer } from '@admin/view/containers/PageContainer';
import { UsersPageContentContainer } from '@admin/view/containers/users/UsersPageContentContainer';
import { UsersPageSubsectionContainer } from '@admin/view/containers/users/UsersPageSubsectionContainer';

export function UsersPage() {

  const usersPage: AppPageSchema = pages[PageTitle.USERS];

  const addUserButtonProps: ButtonProps = {
    icon: PrimeIcons.PLUS,
    label: 'Add new user',
  };

  return (
    <PageLayout page={usersPage}>
      <PageContainer
        page={usersPage}
        addButtonProps={addUserButtonProps}
        content={<UsersPageContentContainer />}
        subsection={<UsersPageSubsectionContainer />}
      />
    </PageLayout>
  );

}
