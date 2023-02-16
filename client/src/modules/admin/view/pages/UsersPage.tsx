import { useState, useEffect } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { Button, type ButtonProps } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import { EMPTY_STRING, LocalStorageKey } from 'shared/constants';
import { LocalStorage } from 'shared/helpers/local-storage';
import { useController } from 'view/hooks/controller';
import { type NavigateFunctionHook, useNavigateWithParams } from 'view/hooks/navigate';

import type { AppPageSchema, LastListPageTabPayload, UsersController } from '@admin/shared/types';
import { ControllerName, CREATE_NEW_LABEL, PagePath, PageTitle, Tab } from '@admin/shared/constants';
import { pages } from '@admin/shared/configs';
import { PageLayout } from '@admin/view/layouts/PageLayout';
import { PageWrapper } from '@admin/view/components/page/PageWrapper';
import { UsersPageListContainer } from '@admin/view/containers/users/UsersPageListContainer';
import { UsersPageSubsectionContainer } from '@admin/view/containers/users/UsersPageSubsectionContainer';
import { PageHeaderTabsContainer } from '@admin/view/containers/page/PageHeaderTabsContainer';

export function UsersPage() {

  const [ isUsersLoaded, setIsUsersLoaded ] = useState<boolean>(false);
  const [ currentTab, setCurrentTab ] = useState<Tab>();

  const usersController = useController(ControllerName.USERS) as UsersController;
  const navigateToUsersInfoPage: NavigateFunctionHook = useNavigateWithParams(PagePath.USERS_INFO);

  const usersPage: AppPageSchema = pages[PageTitle.USERS];

  const usersTabItems: MenuItem[] = [
    {
      label: 'Active',
      data: { tab: Tab.ACTIVE },
    },
    {
      label: 'Deleted',
      data: { tab: Tab.DELETED },
    },
  ];

  const addUserButtonProps: ButtonProps = {
    className: 'p-button-sm',
    icon: PrimeIcons.PLUS,
    label: 'Add new user',
    onClick: () => {
      navigateToUsersInfoPage({ id: CREATE_NEW_LABEL });
    },
  };

  useEffect(() => {
    const tab: LastListPageTabPayload | null = LocalStorage.get(LocalStorageKey.LAST_LIST_PAGE_TAB);

    setCurrentTab(tab && 'user' in tab ? tab.user : Tab.ACTIVE);
  }, []);

  useEffect(() => {
    if (currentTab) {
      usersController.loadUsers({ onlyDeleted: currentTab === Tab.DELETED })
        .then((success: boolean) => {
          if (success) {
            setIsUsersLoaded(true);
          }
        });
    }
  }, [currentTab]);

  return (
    <PageLayout page={usersPage}>
      <PageWrapper
        page={usersPage}
        content={<UsersPageListContainer />}
        tabsMenu={
          currentTab
            ? <PageHeaderTabsContainer
                tabs={usersTabItems}
                currentTab={currentTab}
                tabChange={setCurrentTab}
              />
            : EMPTY_STRING
        }
        actions={<Button {...addUserButtonProps} />}
        subsection={<UsersPageSubsectionContainer />}
        isLoading={!isUsersLoaded}
      />
    </PageLayout>
  );

}
