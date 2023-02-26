import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NotificationContainer } from 'view/containers/NotificationContainer';
import { AppLoader } from 'view/components/AppLoader';

import { PagePath } from '@app/shared/constants';
import { AppHeaderContainer } from '@app/view/containers/AppHeaderContainer';
import { AppPageWrapper } from '@app/view/components/AppPageWrapper';

const HomePage = lazy(() => import('@app/view/pages/HomePage'));
const CartPage = lazy(() => import('@app/view/pages/CartPage'));
const OrdersPage = lazy(() => import('@app/view/pages/OrdersPage'));

export function AppLayout() {

  return (
    <div className="app-container full relative">
      <BrowserRouter>
        <AppHeaderContainer />

        <AppPageWrapper>
          <Suspense fallback={<AppLoader />} >
            <Routes>
              <Route
                path={PagePath.HOME}
                element={<HomePage />}
              />

              <Route
                path={PagePath.CART}
                element={<CartPage />}
              />

              <Route
                path={PagePath.ORDERS}
                element={<OrdersPage />}
              />
            </Routes>
          </Suspense>
        </AppPageWrapper>

        <NotificationContainer />
      </BrowserRouter>
    </div>
  );

}
