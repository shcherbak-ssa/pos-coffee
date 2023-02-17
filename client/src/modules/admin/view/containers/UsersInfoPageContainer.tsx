import { useEffect, useState } from 'react';
import { type Location, type Params, useLocation, useParams } from 'react-router';

import type { EmptyFunction, UserSchema } from 'shared/types';
import { ErrorType } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';
import { useError } from 'view/hooks/error';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PagePathLabel, PageTitle, StoreName, ViewEvent } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { useUsersActionsMenuItems } from '@admin/view/hooks/users-actions-menu-items';
import { type Props as PageLayoutProps, PageLayout } from '@admin/view/layouts/PageLayout';
import { AddressCard } from '@admin/view/components/AddressCard';
import { UsersProfileCard } from '@admin/view/components/UsersProfileCard';
import { UsersPersonalCard } from '@admin/view/components/UsersPersonalCard';
import { UsersInfoWrapper } from '@admin/view/components/UsersInfoWrapper';
import { EventEmitter } from 'shared/helpers/event-emitter';

export type Props = {
  isEditMode: boolean;
}

export function UsersInfoPageContainer({ isEditMode }: Props) {

  const [ isUsersLoading, setIsUsersLoading ] = useState<boolean>(true);
  const [ pageLayoutProps, setPageLayoutProps ] = useState<Omit<PageLayoutProps, 'children'>>();
  const [ isError, setIsError ] = useState<boolean>(false);

  const location: Location = useLocation();
  const params: Params<string> = useParams();

  const { state: { selectedUser }, draftUser } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;
  const [ validationError, cleanValidationError ] = useError<UserSchema>(ErrorType.VALIDATION);

  const toUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);
  const setActionsMenuItems: EmptyFunction = useUsersActionsMenuItems();

  useEffect(() => {
    setActionsMenuItems();
  }, []);

  useEffect(() => {
    const emitter: EventEmitter = EventEmitter.get();

    emitter.on(ViewEvent.SAVE, async (): Promise<void> => {
      const savedUserId: number | void = await usersController.saveUser(selectedUser);

      if (savedUserId) {
        toUsersInfoPage({ id: savedUserId });
      }
    });

    return () => {
      emitter.remove(ViewEvent.SAVE);
    };
  }, [selectedUser]);

  useEffect(() => {
    setPageLayoutProps({
      page: {
        ...pages[PageTitle.USERS],
        to: PagePath.USERS,
        child: {
          title: draftUser.fullname,
        }
      },
      actionsProps: {
        isEntityPage: true,
        entityActionsProps: isUsersLoading ? undefined : {
          entity: selectedUser,
        },
      },
      showSubHeader: false,
      isLoading: isUsersLoading && !isError,
      messageProps: !isError ? undefined : {
        type: 'error',
        message: 'User not found',
      },
    });
  }, [isUsersLoading, isError, selectedUser, isEditMode]);

  useEffect(() => {
    setIsUsersLoading(true);

    if (location.pathname.endsWith(PagePathLabel.CREATE)) {
      usersController.selectUser()
        .then(() => {
          setIsUsersLoading(false);
        });

      return;
    }

    const userId: number = Number(params.id);

    usersController.loadUser(userId)
      .then((success) => {
        if (success) {
          usersController.selectUser(userId)
            .then(() => {
              setIsUsersLoading(false);
            });
        } else {
          setIsError(true);
        }
      });

    // return () => {
    //   usersController.selectUser();
    // };
  }, [location.pathname]);

  useEffect(() => {
    cleanValidationError();
  }, [isEditMode]);

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <UsersInfoWrapper>
          <UsersPersonalCard entity={selectedUser} />

          <UsersProfileCard
            className="col-span-3"
            user={selectedUser}
            draftUser={draftUser}
            validationError={validationError}
            isEditMode={isEditMode}
          />

          <AddressCard
            className="col-span-4"
            address={selectedUser.address}
            draftAddress={draftUser.address}
            validationError={validationError}
            isEditMode={isEditMode}
          />
        </UsersInfoWrapper>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
