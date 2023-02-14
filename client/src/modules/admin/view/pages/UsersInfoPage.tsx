import { useEffect, useState } from 'react';
import { useParams, type Params } from 'react-router-dom';
import type { ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppPageSchema, UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageWrapper } from '@admin/view/components/page/PageWrapper';
import { UsersPageInfoContainer } from '@admin/view/containers/users/UsersPageInfoContainer';

export function UsersInfoPage() {

  const [ isUserLoaded, setIsUserLoaded ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const params: Params<string> = useParams();

  const { draftUser: user } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;

  useEffect(() => {
    const userId: number = Number(params.id);

    usersController.loadUser(userId)
      .then((success) => {
        if (success) {
          usersController.selectUser(userId)
            .then(() => {
              setIsUserLoaded(true);
            });
        } else {
          setIsError(true);
        }
      });
  }, []);

  const userInfoPage: AppPageSchema = {
    ...pages[PageTitle.USERS],
    to: PagePath.USERS,
    child: {
      title: user.fullname,
    },
  };

  const addUserButtonProps: ButtonProps = {
    icon: PrimeIcons.PLUS,
    label: '@TODO',
  };

  return (
    <PageLayout page={userInfoPage}>
      <PageWrapper
        page={userInfoPage}
        addButtonProps={addUserButtonProps}
        content={<UsersPageInfoContainer />}
        isLoading={!isUserLoaded}
        isError={isError}
        errorMessage="User not found"
      />
    </PageLayout>
  );

}
