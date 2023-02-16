import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import type { MenuItem } from 'primereact/menuitem';
import { Button, type ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { ZERO } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { useController } from 'view/hooks/controller';

import type { AppPageSchema, UsersController, UsersStore } from '@admin/shared/types';
import { ControllerName, PagePath, PageTitle, ListTab, StoreName } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageWrapper } from '@admin/view/components/page/PageWrapper';
import { UsersPageListContainer } from '@admin/view/containers/users/UsersPageListContainer';
import { UsersPageSubsectionContainer } from '@admin/view/containers/users/UsersPageSubsectionContainer';

export function UsersPage() {

  const [ isUsersLoaded, setIsUsersLoaded ] = useState<boolean>(false);
  const [ currentTabIndex, setCurrentTabIndex ] = useState<number>(ZERO);

  const navigate: NavigateFunction = useNavigate();

  const { state: { view } } = useStore(StoreName.USERS) as UsersStore;
  const usersController = useController(ControllerName.USERS) as UsersController;

  const usersPage: AppPageSchema = pages[PageTitle.USERS];

  const usersTabItems: MenuItem[] = [
    {
      label: 'Active',
      data: { tab: ListTab.ACTIVE },
      command: () => {
        loadUsers(false);
        usersController.updateViewState('listTab', ListTab.ACTIVE);
      },
    },
    {
      label: 'Deleted',
      data: { tab: ListTab.DELETED },
      command: () => {
        loadUsers(true);
        usersController.updateViewState('listTab', ListTab.DELETED);
      },
    },
  ];

  const addUserButtonProps: ButtonProps = {
    className: 'p-button-sm',
    icon: PrimeIcons.PLUS,
    label: 'Add new user',
    onClick: () => {
      navigate(PagePath.USERS_CREATE);
    },
  };

  useEffect(() => {
    loadUsers(view.listTab === ListTab.DELETED);

    const index: number | undefined
      = usersTabItems.findIndex(({ data }) => data.tab === view.listTab);

    if (index) {
      setCurrentTabIndex(index);
    }
  }, []);

  function loadUsers(onlyDeleted: boolean): void {
    usersController.loadUsers({ onlyDeleted })
      .then((success: boolean) => {
        if (success) {
          setIsUsersLoaded(true);
        }
      });
  }

  return (
    <PageLayout page={usersPage}>
      <PageWrapper
        page={usersPage}
        content={<UsersPageListContainer />}
        tabs={usersTabItems}
        currentTabIndex={currentTabIndex}
        actions={<Button {...addUserButtonProps} />}
        subsection={<UsersPageSubsectionContainer />}
        isLoading={!isUsersLoaded}
      />
    </PageLayout>
  );

}
