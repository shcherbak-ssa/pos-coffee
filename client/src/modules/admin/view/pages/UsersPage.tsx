import type { ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import type { AppPageSchema } from 'modules/admin/shared/types';
import { PageTitle } from 'modules/admin/shared/constants';
import { pages } from 'modules/admin/shared/configs';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';
import { PageContainer } from 'modules/admin/view/containers/PageContainer';
import { UsersPageContentContainer } from 'modules/admin/view/containers/users/UsersPageContentContainer';
import { UsersPageSubsectionContainer } from '../containers/users/UsersPageSubsectionContainer';

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
