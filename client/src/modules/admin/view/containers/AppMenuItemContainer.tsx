import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { Tooltip } from 'primereact/tooltip';

import { EMPTY_STRING } from 'shared/constants';
import { useStore } from 'view/hooks/store';
import { IconButton } from 'view/components/IconButton';

import type { AppStore, MenuItem as MenuItemType } from 'modules/admin/shared/types';
import { StoreName } from 'modules/admin/shared/constants';

export type Props = {
  item: MenuItemType;
  closeMenu: () => void
}

export function AppMenuItemContainer({ item, closeMenu }: Props) {

  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;

  function isActive(): boolean {
    return item.to === location.pathname;
  }

  function navigateTo(e: MouseEvent): void {
    e.preventDefault();

    navigate(item.to);

    if (isAppMenuOpen) {
      closeMenu();
    }
  }

  return (
    <div
      className={classnames('app-menu-item rounded flex items-center py-2 duration-200 select-none', {
        'is-active': isActive() && isAppMenuOpen,
        'click px-2 gap-2': isAppMenuOpen,
        'is-close px-0': !isAppMenuOpen,
      })}
      // @ts-ignore
      onClick={navigateTo}
      data-pr-tooltip={item.label}
      data-pr-position="right"
      data-pr-at="right+5 center"
    >
      <IconButton
        className={classnames({
          'is-active': isActive() && !isAppMenuOpen,
        })}
        icon={item.icon}
        click={() => {}}
      />

      <div
        className={classnames('font-semibold overflow-hidden duration-200', {
          'w-32': isAppMenuOpen,
          'w-0': !isAppMenuOpen,
        })}
      >
        { item.label }
      </div>

      { isAppMenuOpen ? EMPTY_STRING : <Tooltip target=".app-menu-item" /> }
    </div>
  );

}
