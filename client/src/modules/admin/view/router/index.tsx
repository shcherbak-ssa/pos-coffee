import { createBrowserRouter } from 'react-router-dom';

import { PagePath } from 'modules/admin/shared/constants';
import { HomePage } from 'modules/admin/view/pages/HomePage';
import { UsersPage } from 'modules/admin/view/pages/UsersPage';
import { ProductsPage } from 'modules/admin/view/pages/ProductsPage';
import { SitesPage } from 'modules/admin/view/pages/SitesPage';
import { DashboardPage } from 'modules/admin/view/pages/DashboardPage';
import { OrdersPage } from 'modules/admin/view/pages/OrdersPage';
import { SettingsPage } from 'modules/admin/view/pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: PagePath.HOME,
    element: <HomePage />,
  },
  {
    path: PagePath.DASHBOARD,
    element: <DashboardPage />,
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
    path: PagePath.ORDERS,
    element: <OrdersPage />,
  },
  {
    path: PagePath.USERS,
    element: <UsersPage />,
  },
  {
    path: PagePath.SETTINGS,
    element: <SettingsPage />,
  },
]);
