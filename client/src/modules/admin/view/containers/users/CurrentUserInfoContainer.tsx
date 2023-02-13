import { useRef } from 'react';
import type { MenuItem } from 'primereact/menuitem';
import { PrimeIcons } from 'primereact/api';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

import { getUserInitials } from 'shared/utils';
import { useStore } from 'view/hooks/store';

import type { UsersStore } from 'modules/admin/shared/types';
import { StoreName } from 'modules/admin/shared/constants';
import { PageElementWrapper } from "modules/admin/view/components/PageElementWrapper";
import { UserDataDisplay } from 'modules/admin/view/components/UserDataDisplay';

export function CurrentUserInfoContainer() {

  const menu = useRef(null);
  const { state: { currentUser } } = useStore(StoreName.USERS) as UsersStore;

  const menuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      command: () => {},
    },
  ];

  function toggleMenu(e: typeof MouseEvent): void {
    if (menu) {
      // @ts-ignore
      menu.current.toggle(e);
    }
  }

  return (
    <PageElementWrapper>
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-6">
          <Avatar
            label={getUserInitials(currentUser)}
            size="xlarge"
            shape="circle"
          />

          <div className="inline-flex gap-2">
            <span className="font-semibold">
              {`${currentUser.name} ${currentUser.surname}` }
            </span>

            <span className="user-type">
              { currentUser.type }
            </span>
          </div>
        </div>

        <Button
          className="p-button-text"
          icon={PrimeIcons.ELLIPSIS_H}
          // @ts-ignore
          onClick={toggleMenu}
        />

        <Menu
          model={menuItems}
          popup={true}
          ref={menu}
        />
      </div>

      <Divider />

      <div className="p-6">
        <UserDataDisplay
          icon={PrimeIcons.USER}
          value={currentUser.username}
        />

        <UserDataDisplay
          icon={PrimeIcons.ENVELOPE}
          value={currentUser.email}
        />

        <UserDataDisplay
          icon={PrimeIcons.PHONE}
          value={currentUser.phone}
        />
      </div>
    </PageElementWrapper>
  );

}
