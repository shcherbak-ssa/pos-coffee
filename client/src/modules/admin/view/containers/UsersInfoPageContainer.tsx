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
import { UsersPersonalCard } from '@admin/view/components/UsersPersonalCard';
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
