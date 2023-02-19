import type { UserSchema } from 'shared/types';
import { useStore } from 'view/hooks/store';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { UsersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { AddressCard } from '@admin/view/components/AddressCard';
import { UsersProfileCard } from '@admin/view/components/UsersProfileCard';
import { UsersCard } from '@admin/view/components/UsersCard';
import { UsersInfoWrapper } from '@admin/view/components/UsersInfoWrapper';
import { Return, useInfoPageContainer } from '@admin/view/hooks/info-page-container';

export type Props = {
  isEditMode: boolean;
}

export function UsersInfoPageContainer({ isEditMode }: Props) {

  const { state: { selected: selectedUser }, draft: draftUser } = useStore(StoreName.USERS) as UsersStore;
  const actionsMenuItemsProps: ActionsMenuItemsProps = useUsersActionsMenuItemsProps();

  const [ pageLayoutProps, validationError ]: Return<UserSchema> = useInfoPageContainer({
    page: {
      to: PagePath.USERS,
      child: { title: draftUser.fullname },
    },
    pageTitle: PageTitle.USERS,
    storeName: StoreName.USERS,
    controllerName: ControllerName.USERS,
    infoPagePath: PagePath.USERS_INFO,
    errorMessage: 'User not found',
    actionsMenuItemsProps,
    isEditMode,
  });

  function drawAddressCard(): React.ReactNode {
    if (selectedUser.address) {
      return (
        <AddressCard
          className="col-span-4"
          entity={selectedUser.address}
          entityDraft={draftUser.address}
          validationError={validationError}
          isEditMode={isEditMode}
        />
      );
    }
  }

  if (pageLayoutProps) {
    return (
      <PageLayout {...pageLayoutProps}>
        <UsersInfoWrapper>
          <UsersCard entity={selectedUser} />

          <UsersProfileCard
            className="col-span-3"
            entity={selectedUser}
            entityDraft={draftUser}
            validationError={validationError}
            isEditMode={isEditMode}
          />

          { drawAddressCard() }
        </UsersInfoWrapper>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
