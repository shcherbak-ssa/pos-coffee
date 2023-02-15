import { useEffect, useState } from 'react';
import { type Location, useLocation, useParams, type Params } from 'react-router-dom';
import type { ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

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

export function UsersInfoPage() {

  const [ isUserLoaded, setIsUserLoaded ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ isSaveProcessing, setIsSaveProcessing ] = useState<boolean>(false);

  const location: Location = useLocation();
  const params: Params<string> = useParams();

  const { state: { selectedUser }, draftUser: user } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

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

    if (location.state && location.state.isEditMode) {
      setIsEditMode(true);
    }

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

  const userInfoPage: AppPageSchema = {
    ...pages[PageTitle.USERS],
    to: PagePath.USERS,
    child: {
      title: user.fullname,
    },
  };

  const actionButtonProps: ButtonProps = {
    icon: isEditMode ? PrimeIcons.SAVE : PrimeIcons.PENCIL,
    label: isEditMode ? 'Save' : 'Edit',
    loading: isSaveProcessing,
    onClick: () => {
      if (isSaveProcessing) {
        return;
      }

      if (isEditMode) {
        setIsSaveProcessing(true);

        usersController.saveUser(selectedUser)
          .then((success) => {
            if (success) {
              setIsEditMode(false);
            }

            setIsSaveProcessing(false);
          });
      } else {
        setIsEditMode(true);
      }
    },
  };

  const deletedLabelButtonProps: ButtonProps = {
    className: 'button-label p-button-text p-button-danger',
    label: 'DELETED',
    disabled: true,
  };

  return (
    <PageLayout page={userInfoPage}>
      <PageWrapper
        page={userInfoPage}
        addButtonProps={selectedUser.isDeleted ? deletedLabelButtonProps : actionButtonProps}
        content={<UsersPageInfoContainer isEditMode={isEditMode} />}
        isLoading={!isUserLoaded}
        isError={isError}
        errorMessage="User not found"
      />
    </PageLayout>
  );

}
