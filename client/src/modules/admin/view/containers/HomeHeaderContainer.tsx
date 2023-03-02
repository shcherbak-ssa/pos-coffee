import { useStore } from 'view/hooks/store';

import type { AppStore } from '@admin/shared/types';
import { StoreName } from '@admin/shared/constants';
import { HomeWelcome } from '@admin/view/components/HomeWelcome';

export function HomeHeaderContainer() {

  const { state: { currentUser } } = useStore(StoreName.APP) as AppStore;

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <HomeWelcome user={currentUser} />
      </div>
    </div>
  );

}
