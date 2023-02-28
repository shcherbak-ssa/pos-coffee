import { ScrollPanel } from 'primereact/scrollpanel';

import { HomeUsersContainer } from '@app/view/containers/HomeUsersContainer';
import { HomeWelcome } from '@app/view/components/HomeWelcome';

export function HomePageContainer() {

  return (
    <div className="px-6 full">
      <ScrollPanel style={{ width: 'calc(100% + 18px)', height: 'calc(100% - 0px)' }}>
        <div className="grid grid-cols-3 gap-4 py-6">
          <HomeWelcome className="col-span-2" />

          <HomeUsersContainer />
        </div>
      </ScrollPanel>
    </div>
  );

}
