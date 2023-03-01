import { ScrollPanel } from 'primereact/scrollpanel';

import { HomeUsersContainer } from '@app/view/containers/HomeUsersContainer';
import { HomeOrdersContainer } from '@app/view/containers/HomeOrdersContainer';
import { HomeWelcome } from '@app/view/components/HomeWelcome';

export function HomePageContainer() {

  return (
    <ScrollPanel style={{ width: 'calc(100% + 18px)', height: 'calc(100% - 0px)' }}>
      <div className="px-6 full">
          <div className="grid grid-cols-3 gap-4 py-6">
            <div className="col-span-2" >
              <HomeWelcome className="mb-6" />

              <HomeOrdersContainer />
            </div>

            <HomeUsersContainer />
          </div>
      </div>
    </ScrollPanel>
  );

}
