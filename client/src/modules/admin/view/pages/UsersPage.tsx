import { useState, useEffect } from 'react';
import type { ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { useController } from 'view/hooks/controller';

import type { AppPageSchema, UsersController } from '@admin/shared/types';
import { ControllerName, PageTitle } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageWrapper } from '@admin/view/components/page/PageWrapper';
import { UsersPageListContainer } from '@admin/view/containers/users/UsersPageListContainer';
import { UsersPageSubsectionContainer } from '@admin/view/containers/users/UsersPageSubsectionContainer';

export function UsersPage() {

  const [ isUsersLoaded, setIsUsersLoaded ] = useState<boolean>(false);
  const usersController = useController(ControllerName.USERS) as UsersController;

  const usersPage: AppPageSchema = pages[PageTitle.USERS];

  const addUserButtonProps: ButtonProps = {
    icon: PrimeIcons.PLUS,
    label: 'Add new user',
  };

  useEffect(() => {
    usersController.loadUsers()
      .then((success: boolean) => {
        if (success) {
          setIsUsersLoaded(true);
        }
      });
  }, []);

  return (
    <PageLayout page={usersPage}>
      <PageWrapper
        page={usersPage}
        addButtonProps={addUserButtonProps}
        content={<UsersPageListContainer />}
        subsection={<UsersPageSubsectionContainer />}
        isLoading={!isUsersLoaded}
      />
    </PageLayout>
  );

}
