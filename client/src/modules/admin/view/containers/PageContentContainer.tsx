import classnames from 'classnames';
import { ScrollPanel } from 'primereact/scrollpanel';

import { useStore } from 'view/hooks/store';

import type { AppStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';

export type Props = {
  header: React.ReactNode;
  children: React.ReactNode;
}

export function PageContentContainer({ header, children }: Props) {

  const { state: { isAppMenuOpen } } = useStore(StoreName.APP) as AppStore;

  return (
    <ScrollPanel style={{ width: '100%', height: 'calc(100% - 6rem)' }}>
      <div
        className={classnames('p-12 duration-200', {
          'lg:pl-72': isAppMenuOpen,
          'lg:pl-36': !isAppMenuOpen,
        })}
      >
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="page-header border-b-2 flex items-center justify-between p-6 relative">
            { header }
          </div>

          { children }
        </div>
      </div>
    </ScrollPanel>
  );

}
