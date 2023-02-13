import { createBrowserRouter } from 'react-router-dom';

import { PagePath } from 'modules/admin/shared/constants';
import { HomePage } from 'modules/admin/view/pages/HomePage';
import { UsersPage } from 'modules/admin/view/pages/UsersPage';
import { ProductsPage } from 'modules/admin/view/pages/ProductsPage';
import { SitesPage } from 'modules/admin/view/pages/SitesPage';

export const router = createBrowserRouter([
  {
    path: PagePath.HOME,
    element: <HomePage />,
  },
  {
    path: PagePath.SITES,
    element: <SitesPage />,
  },
  {
    path: PagePath.PRODUCTS,
    element: <ProductsPage />,
  },
  {
    path: PagePath.USERS,
    element: <UsersPage />,
  },
]);
