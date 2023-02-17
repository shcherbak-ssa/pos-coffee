import { createBrowserRouter } from 'react-router-dom';

import { PagePath } from '@admin/shared/constants';
import { HomePage } from '@admin/view/pages/HomePage';
import { UsersPage } from '@admin/view/pages/UsersPage';
import { ProductsPage } from '@admin/view/pages/ProductsPage';
import { DashboardPage } from '@admin/view/pages/DashboardPage';
import { OrdersPage } from '@admin/view/pages/OrdersPage';
import { SettingsPage } from '@admin/view/pages/SettingsPage';
// import { UsersInfoPage } from '@admin/view/pages/UsersInfoPage';

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
  // {
  //   path: PagePath.USERS_INFO,
  //   element: <UsersInfoPage />,
  // },
  // {
  //   path: PagePath.USERS_CREATE,
  //   element: <UsersInfoPage isEditPage />,
  // },
  // {
  //   path: PagePath.USERS_EDIT,
  //   element: <UsersInfoPage isEditPage />,
  // },
  {
    path: PagePath.SETTINGS,
    element: <SettingsPage />,
  },
]);
