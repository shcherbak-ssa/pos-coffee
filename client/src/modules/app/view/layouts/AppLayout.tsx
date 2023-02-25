import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotificationContainer } from 'view/containers/NotificationContainer';
import { AppLoader } from 'view/components/AppLoader';

import { PagePath } from '@app/shared/constants';
import { AppHeaderContainer } from '@app/view/containers/AppHeaderContainer';

const HomePage = lazy(() => import('@app/view/pages/HomePage'));
const NewOrderPage = lazy(() => import('@app/view/pages/NewOrderPage'));
const OrdersPage = lazy(() => import('@app/view/pages/OrdersPage'));

export function AppLayout() {

  return (
    <div className="app-container full relative">
      <BrowserRouter>
        <AppHeaderContainer />

        <div className="p-6">
          <Suspense fallback={<AppLoader />} >
            <Routes>
              <Route
                path={PagePath.HOME}
                element={<HomePage />}
              />

              <Route
                path={PagePath.NEW_ORDER}
                element={<NewOrderPage />}
              />

              <Route
                path={PagePath.ORDERS}
                element={<OrdersPage />}
              />
            </Routes>
          </Suspense>
        </div>

        <NotificationContainer />
      </BrowserRouter>
    </div>
  );

}
