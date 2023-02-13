import { PageTitle } from 'modules/admin/shared/constants';
import { PageLayout } from 'modules/admin/view/layouts/PageLayout';
import { CurrentUserInfoContainer } from 'modules/admin/view/containers/users/CurrentUserInfoContainer';

export function UsersPage() {

  return (
    <PageLayout pageTitle={PageTitle.USERS}>
      <div className="container">
        <div className="w-full md:w-3/4 mx-auto">
          <CurrentUserInfoContainer />
        </div>
      </div>
    </PageLayout>
  );

}
