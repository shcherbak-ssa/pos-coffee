import { RouterProvider } from 'react-router-dom';

import { AppLoader } from 'view/components/AppLoader';

import { router } from 'modules/admin/view/router';

export function EntryLayout() {

  return (
    <RouterProvider
      router={router}
      fallbackElement={<AppLoader />}
    />
  );

}
