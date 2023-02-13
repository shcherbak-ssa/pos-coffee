import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { Ripple } from 'primereact/ripple';

import { EMPTY_STRING } from 'shared/constants';

import type { MenuItem as MenuItemType } from 'modules/admin/shared/types';
import { MENU_ITEM_HEIGHT } from 'modules/admin/shared/constants';

export type Props = {
  item: MenuItemType;
}

export function AppMenuItemContainer({ item }: Props) {

  const location = useLocation();
  const navigate = useNavigate();

  const [ isSubmenuOpen, setIsSubmenuOpen ] = useState<boolean>(false);

  useEffect(() => {
    if (item.items && item.items.length) {
      for (const it of item.items) {
        if (it.to === location.pathname) {
          setIsSubmenuOpen(true);
        }
      }
    }
  }, []);

  function isActive(): boolean {
    return item.to === location.pathname;
  }

  function navigateTo(e: MouseEvent): void {
    e.preventDefault();

    if (item.items && item.items.length) {
      const newState: boolean = !isSubmenuOpen;

      setIsSubmenuOpen(newState);

      if (newState) {
        const firstItemTo: string | undefined = item.items[0].to;

        if (firstItemTo) {
          navigate(firstItemTo);
        }
      }

      return;
    }

    if (item.to) {
      navigate(item.to);
    }
  }

  function calculateSubmenuHeight(itemsCount: number): number {
    return itemsCount * MENU_ITEM_HEIGHT;
  }

  return (
    <>
      <div
        className={classnames('menu-item flex items-start justify-between py-3 px-4 w-full select-none p-ripple', {
          'is-active': isActive(),
          'click': !isActive(),
        })}
        // @ts-ignore
        onClick={navigateTo}
      >
        <div className="flex items-center gap-2">
          { item.icon ? <span className={item.icon} /> : EMPTY_STRING }

          <span>{ item.label }</span>
        </div>

        {
          item.items && item.items.length
            ? <div>
                <span className={PrimeIcons.ANGLE_DOWN} />
              </div>
            : EMPTY_STRING
        }

        <Ripple />
      </div>

      {
        item.items && item.items.length
          ? <div
              className={classnames('submenu-items opacity-0 duration-200', {
                'opacity-100': isSubmenuOpen,
              })}
              style={{
                height: isSubmenuOpen ? `${calculateSubmenuHeight(item.items.length)}px` : '0',
              }}
            >
              {
                isSubmenuOpen
                  ? item.items.map((item, index) => {
                      return <AppMenuItemContainer key={index} item={item} />;
                    })
                  : EMPTY_STRING
              }
            </div>
          : EMPTY_STRING
      }
    </>
  );

}
