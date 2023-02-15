import { useEffect, useState } from 'react';
import { useParams, type Params } from 'react-router-dom';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { AppPageSchema, UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, CREATE_NEW_LABEL, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageWrapper } from '@admin/view/components/page/PageWrapper';
import { UsersPageInfoContainer } from '@admin/view/containers/users/UsersPageInfoContainer';
import { UsersPageInfoActionsContainer } from '@admin/view/containers/users/UsersPageInfoActionsContainer';

export type Props = {
  isEditPage?: boolean;
}

export function UsersInfoPage({ isEditPage = false }: Props) {

  const [ isUserLoaded, setIsUserLoaded ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(isEditPage);

  const params: Params<string> = useParams();

  const { state: { selectedUser }, draftUser: user } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const userInfoPage: AppPageSchema = {
    ...pages[PageTitle.USERS],
    to: PagePath.USERS,
    child: {
      title: user.fullname,
    },
  };

  useEffect(() => {
    setIsEditMode(isEditPage);
  }, [isEditPage]);

  useEffect(() => {
    const { id } = selectedUser;

    if (id !== ZERO && id.toString() !== params.id) {
      navigateToUsersInfoPage({ id });
    }
  }, [selectedUser.id]);

  useEffect(() => {
    if (params.id === CREATE_NEW_LABEL) {
      setIsEditMode(true);

      usersController.selectUser()
        .then(() => {
          setIsUserLoaded(true);
        });

      return;
    }

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

    return () => {
      usersController.selectUser();
    };
  }, []);

  return (
    <PageLayout page={userInfoPage}>
      <PageWrapper
        page={userInfoPage}
        actions={<UsersPageInfoActionsContainer isEditMode={isEditMode} />}
        content={<UsersPageInfoContainer isEditMode={isEditMode} />}
        isLoading={!isUserLoaded}
        isError={isError}
        errorMessage="User not found"
      />
    </PageLayout>
  );

}
