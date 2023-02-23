import type { UserSchema } from 'shared/types';
import { EntityName } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { EmptyComponent } from 'view/components/EmptyComponent';

import type { UsersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs/pages';
import type { Props as ActionsMenuItemsProps } from '@admin/view/hooks/actions-menu-items';
import { useUsersActionsMenuItemsProps } from '@admin/view/hooks/users-actions-menu-items';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { AddressCard } from '@admin/view/components/AddressCard';
import { UsersProfileCard } from '@admin/view/components/UsersProfileCard';
import { UsersCard } from '@admin/view/components/UsersCard';
import { Return, useInfoPageContainer } from '@admin/view/hooks/info-page-container';
import { InfoPageWrapper } from '@admin/view/components/InfoPageWrapper';

export type Props = {
  isEditMode: boolean;
}

export function UsersInfoPageContainer({ isEditMode }: Props) {

  const { state: { selected: selectedUser }, draft: draftUser } = useStore(StoreName.USERS) as UsersStore;
  const actionsMenuItemsProps: ActionsMenuItemsProps = useUsersActionsMenuItemsProps();

  const [ pageLayoutProps, validationError ]: Return<UserSchema> = useInfoPageContainer({
    page: {
      ...pages[PageTitle.USERS],
      to: PagePath.USERS,
      child: { title: draftUser.fullname },
    },
    storeName: StoreName.USERS,
    controllerName: ControllerName.USERS,
    infoPagePath: PagePath.USERS_INFO,
    entityName: EntityName.USER,
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
        <InfoPageWrapper className="grid-cols-4">
          <UsersCard entity={selectedUser} />

          <UsersProfileCard
            className="col-span-3"
            entity={selectedUser}
            entityDraft={draftUser}
            validationError={validationError}
            isEditMode={isEditMode}
          />

          { drawAddressCard() }
        </InfoPageWrapper>
      </PageLayout>
    );
  }

  return <EmptyComponent />;

}
