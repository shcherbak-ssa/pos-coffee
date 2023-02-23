import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { Tooltip } from 'primereact/tooltip';

import { EMPTY_STRING } from 'shared/constants';
import { IconButton } from 'view/components/IconButton';

import type { AppMenuItem } from '@admin/shared/types';

export type Props = {
  item: AppMenuItem;
  isActive: boolean;
  isAppMenuOpen: boolean;
  click: (item: AppMenuItem) => void;
}

export function AppMenuItem({ item, isActive, isAppMenuOpen, click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click(item);
  }

  return (
    <div
      className={classnames('app-menu-item hover:bg-white rounded flex items-center py-1 select-none', {
        'is-active': isActive && isAppMenuOpen,
        'click': isAppMenuOpen,
        'is-close': !isAppMenuOpen,
      })}
      onClick={handleClick}
      data-pr-tooltip={item.label}
      data-pr-position="right"
      data-pr-at="right+5 center"
    >
      <IconButton
        className={classnames({
          'is-active font-semibold': isActive && !isAppMenuOpen,
        })}
        icon={item.icon}
        click={() => {}}
      />

      <div
        className={classnames('overflow-hidden duration-200', {
          'font-semibold': isActive,
          'w-32 ml-2': isAppMenuOpen,
          'w-0 ml-0': !isAppMenuOpen,
        })}
      >
        { item.label }
      </div>

      { isAppMenuOpen ? EMPTY_STRING : <Tooltip target=".app-menu-item" /> }
    </div>
  );

}
