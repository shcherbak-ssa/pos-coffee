import type { MouseEvent } from 'react';
import classnames from 'classnames';
import { Tooltip } from 'primereact/tooltip';

import { EMPTY_STRING } from 'shared/constants';
import { IconButton } from 'view/components/IconButton';

import type { AppMenuItem } from '@admin/shared/types';

export type Props = {
  item: AppMenuItem;
  isItemActive: boolean;
  isAppMenuOpen: boolean;
  click: (item: AppMenuItem) => void;
}

export function AppMenuItem({ item, isItemActive, isAppMenuOpen, click }: Props) {

  function handleClick(e: MouseEvent): void {
    e.preventDefault();

    click(item);
  }

  return (
    <div
      className={classnames('app-menu-item rounded flex items-center py-2 duration-200 select-none', {
        'is-active': isItemActive && isAppMenuOpen,
        'click px-2 gap-2': isAppMenuOpen,
        'is-close px-0 gap-0': !isAppMenuOpen,
      })}
      onClick={handleClick}
      data-pr-tooltip={item.label}
      data-pr-position="right"
      data-pr-at="right+5 center"
    >
      <IconButton
        className={classnames({
          'is-active': isItemActive && !isAppMenuOpen,
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
